import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { FileParser, FileParserInput } from './file-parser.interface';
import { sleep } from './utils/sleep';
import { FileObject } from 'openai/resources/files';

const TERMINAL_STATES = ['completed', 'failed', 'cancelled', 'expired', 'requires_action'];
const PARSE_PROMPT = (filename: string) =>
    `Please extract the full text content from the attached file named '${filename}'. Focus solely on extracting the text as accurately as possible. Return only the raw text. Do not add any commentary or formatting.`;

@Injectable()
export class OpenAIFileParserService implements FileParser {
    private readonly logger = new Logger(OpenAIFileParserService.name);
    private openai: OpenAI;
    private assistantId: string;
    private pollIntervalMs = 1500;
    private maxPollingAttempts = 40;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');
        this.assistantId = this.configService.get<string>('OPENAI_ASSISTANT_ID_PARSER');

        if (!apiKey || !this.assistantId) {
            this.logger.error('OpenAI configuration is missing.');
            throw new Error('OpenAI API key and assistant ID must be configured.');
        }

        this.openai = new OpenAI({ apiKey });
        this.logger.log(`OpenAI client initialized (Assistant ID: ${this.assistantId}).`);
    }

    async parse(input: FileParserInput): Promise<string> {
        this.logger.log(`Parsing ${input.originalname} (${input.mimetype}, ${(input.buffer.length / 1024).toFixed(2)} KB)...`);

        if (input.mimetype === 'text/plain') {
            this.logger.log('Plain text file detected. Returning content directly.');
            return input.buffer.toString('utf-8');
        }

        let fileId: string | null = null;
        let threadId: string | null = null;

        try {
            fileId = await this.uploadFile(input);
            threadId = await this.createThread();
            await this.sendMessage(threadId, fileId, input.originalname);
            const runId = await this.createRun(threadId);
            const run = await this.pollRunStatus(threadId, runId);

            if (run.status !== 'completed') {
                this.logger.error(`Run finished with non-completed status: ${run.status}`, JSON.stringify(run));
                const runSteps = await this.openai.beta.threads.runs.steps.list(threadId, runId, { limit: 1, order: 'desc' });
                const lastError = runSteps?.data?.[0]?.last_error;
                let errorMessage = `Assistant run failed with status ${run.status}.`;
                if (lastError?.code || lastError?.message) {
                    errorMessage += ` Last error from steps: ${lastError.code} - ${lastError.message}`;
                } else if (run.last_error) {
                    errorMessage += ` Last error from run: ${run.last_error.code} - ${run.last_error.message}`;
                } else if ((run as any).failure_reason) {
                    errorMessage += ` Failure reason: ${(run as any).failure_reason}`;
                } else if ((run as any).incomplete_details?.reason) {
                    errorMessage += ` Incomplete reason: ${(run as any).incomplete_details.reason}`;
                } else {
                    errorMessage += ` No detailed error provided by API. Full run object logged above.`;
                }
                throw new Error(errorMessage);
            }
            this.logger.debug('Run completed successfully.');

            const messages = await this.openai.beta.threads.messages.list(threadId, { order: 'asc' });
            const extracted = this.extractTextFromAssistant(messages.data);
            this.logger.log(`Text extracted (length: ${extracted.length}) from ${input.originalname}`);
            return extracted;

        } catch (err) {
            this.logger.error(`Parsing failed for ${input.originalname}: ${err.message}`, err.stack);
            throw new Error(`Failed to parse file: ${err.message}`);
        } finally {
            await this.cleanupResources(fileId, threadId);
        }
    }

    private async uploadFile(input: FileParserInput): Promise<string> {
        const file = new File([input.buffer], input.originalname, { type: input.mimetype });
        const result: FileObject = await this.openai.files.create({ file, purpose: 'assistants' });
        this.logger.debug(`File uploaded. ID: ${result.id}`);
        return result.id;
    }

    private async createThread(): Promise<string> {
        const thread = await this.openai.beta.threads.create();
        this.logger.debug(`Thread created. ID: ${thread.id}`);
        return thread.id;
    }

    private async sendMessage(threadId: string, fileId: string, filename: string) {
        await this.openai.beta.threads.messages.create(threadId, {
            role: 'user',
            content: PARSE_PROMPT(filename),
            attachments: [{ file_id: fileId, tools: [{ type: 'file_search' }] }],
        });
        this.logger.debug('Message with file sent.');
    }

    private async createRun(threadId: string): Promise<string> {
        const run = await this.openai.beta.threads.runs.create(threadId, {
            assistant_id: this.assistantId,
            response_format: { type: 'text' },
        });
        this.logger.debug(`Run created. ID: ${run.id}`);
        return run.id;
    }

    private async pollRunStatus(threadId: string, runId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
        this.logger.debug(`Polling run status for ID: ${runId}`);
        for (let attempt = 1; attempt <= this.maxPollingAttempts; attempt++) {
            const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
            this.logger.debug(`Attempt ${attempt}: Status = ${run.status}`);
            if (TERMINAL_STATES.includes(run.status)) return run;
            await sleep(this.pollIntervalMs);
        }

        await this.cancelRun(threadId, runId);
        throw new Error(`Polling timed out for run ${runId}`);
    }

    private async cancelRun(threadId: string, runId: string) {
        try {
            await this.openai.beta.threads.runs.cancel(threadId, runId);
            this.logger.warn(`Run ${runId} cancelled after timeout.`);
        } catch (err) {
            this.logger.error(`Failed to cancel run ${runId}: ${err.message}`);
        }
    }

    private extractTextFromAssistant(messages: OpenAI.Beta.Threads.Messages.Message[]): string {
        const assistantMsg = messages.reverse().find(m => m.role === 'assistant');
        if (!assistantMsg?.content) throw new Error('No assistant message content.');
        const text = assistantMsg.content
            .filter(c => c.type === 'text')
            .map(c => c.text.value)
            .join('\n')
            .trim();
        if (!text) throw new Error('Assistant returned empty text.');
        return text;
    }

    private async cleanupResources(fileId: string | null, threadId: string | null) {
        const tasks = [];

        if (fileId) {
            this.logger.debug(`Deleting file: ${fileId}`);
            tasks.push(this.openai.files.del(fileId).catch(err => {
                this.logger.warn(`Failed to delete file ${fileId}: ${err.message}`);
            }));
        }

        if (threadId) {
            this.logger.debug(`Deleting thread: ${threadId}`);
            tasks.push(this.openai.beta.threads.del(threadId).catch(err => {
                this.logger.warn(`Failed to delete thread ${threadId}: ${err.message}`);
            }));
        }

        if (tasks.length) {
            await Promise.all(tasks);
            this.logger.debug('Cleanup complete.');
        }
    }
}
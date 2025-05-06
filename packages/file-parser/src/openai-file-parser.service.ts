import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Readable } from 'stream';
import { FileParser, FileParserInput } from './file-parser.interface';
import { sleep } from './utils/sleep';
import { FileObject } from 'openai/resources/files';

@Injectable()
export class OpenAIFileParserService implements FileParser {
    private readonly logger = new Logger(OpenAIFileParserService.name);
    private openai: OpenAI;
    private assistantId: string;
    private pollIntervalMs = 1500; // Increased polling interval
    private maxPollingAttempts = 40; // ~60 seconds timeout

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');
        this.assistantId = this.configService.get<string>('OPENAI_ASSISTANT_ID_PARSER');

        if (!apiKey) {
            this.logger.error('OPENAI_API_KEY is not configured.');
            throw new Error('OPENAI_API_KEY must be configured for File Parser.');
        }
        if (!this.assistantId) {
            this.logger.error('OPENAI_ASSISTANT_ID_PARSER is not configured.');
            throw new Error('OPENAI_ASSISTANT_ID_PARSER must be configured for File Parser.');
        }
        this.openai = new OpenAI({ apiKey });
        this.logger.log(`OpenAI client initialized for File Parser Service (Assistant ID: ${this.assistantId}).`);
    }

    async parse(input: FileParserInput): Promise<string> {
        this.logger.log(`Parsing file ${input.originalname} (${input.mimetype}, ${(input.buffer.length / 1024).toFixed(2)} KB) using OpenAI Assistant ${this.assistantId}...`);

        if (input.mimetype === 'text/plain') {
            this.logger.log('File is plain text, returning directly.');
            return input.buffer.toString('utf-8');
        }

        let fileId: string | null = null;
        let threadId: string | null = null;

        try {
            // 1. Upload File
            this.logger.debug(`Uploading file ${input.originalname} to OpenAI...`);

            // Construct a File object compatible with OpenAI SDK (uses shims)
            // The File constructor is expected to be available globally via OpenAI's shims.
            // It typically takes: new File(fileBits, fileName, options)
            // fileBits is an array of BlobParts (Buffer is a BlobPart).
            // options can include { type: string }.
            const fileForUpload = new File([input.buffer], input.originalname, { type: input.mimetype });

            const fileObject: FileObject = await this.openai.files.create({
                file: fileForUpload, // Pass the SDK-compatible File object
                purpose: 'assistants',
            });
            fileId = fileObject.id;
            this.logger.debug(`File uploaded successfully. File ID: ${fileId}`);

            // 2. Create Thread
            this.logger.debug('Creating new assistant thread...');
            const thread = await this.openai.beta.threads.create();
            threadId = thread.id;
            this.logger.debug(`Thread created successfully. Thread ID: ${threadId}`);

            // 3. Create Message with File Attachment
            this.logger.debug(`Adding message with file attachment to thread ${threadId}...`);
            await this.openai.beta.threads.messages.create(threadId, {
                role: 'user',
                content: `Please extract the full text content from the attached file named '${input.originalname}'. Focus solely on extracting the text as accurately as possible. Return only the raw text. Do not add any commentary or formatting.`, // Refined prompt
                attachments: [{ file_id: fileId, tools: [{ type: 'file_search' }] }],
            });
            this.logger.debug('Message added successfully.');

            // 4. Create Run
            this.logger.debug(`Creating run for thread ${threadId} with assistant ${this.assistantId}...`);
            let run = await this.openai.beta.threads.runs.create(threadId, {
                assistant_id: this.assistantId,
                response_format: { type: 'text' }
            });
            const runId = run.id;
            this.logger.debug(`Run created successfully. Run ID: ${runId}`);

            // 5. Poll Run Status
            run = await this.pollRunStatus(threadId, runId);

            if (run.status !== 'completed') {
                this.logger.error(`Run finished with non-completed status: ${run.status}`);
                const runSteps = await this.openai.beta.threads.runs.steps.list(threadId, runId, { limit: 1, order: 'desc' });
                const lastError = runSteps?.data?.[0]?.last_error;
                throw new Error(`Assistant run failed with status ${run.status}. Last error: ${lastError?.code} - ${lastError?.message}`);
            }
            this.logger.debug('Run completed successfully.');

            // 6. Retrieve Messages
            this.logger.debug(`Retrieving messages for thread ${threadId}...`);
            const messages = await this.openai.beta.threads.messages.list(threadId, {
                order: 'asc', // Get messages in order to find the last assistant one easily
            });

            // 7. Extract Text Content from the last assistant message
            const assistantMessages = messages.data.filter(m => m.role === 'assistant');
            const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];
            let extractedText = '';

            if (lastAssistantMessage?.content) {
                for (const contentBlock of lastAssistantMessage.content) {
                    if (contentBlock.type === 'text') {
                        extractedText += contentBlock.text.value + '\n';
                    }
                }
            } else {
                this.logger.warn('No assistant messages found or last message has no content.');
                throw new Error('Assistant did not provide a response message.');
            }

            if (!extractedText.trim()) {
                this.logger.warn('Assistant message found, but no text content was extracted.');
                throw new Error('Assistant did not return any text content.');
            }

            this.logger.log(`Successfully extracted text content (length: ${extractedText.trim().length}) for file ${input.originalname}.`);
            return extractedText.trim();

        } catch (error) {
            this.logger.error(`Error during OpenAI file parsing for ${input.originalname}: ${error.message}`, error.stack);
            throw new Error(`Failed to parse file content via OpenAI: ${error.message}`);
        } finally {
            // 8. Cleanup (Best Effort)
            this.cleanupResources(fileId, threadId);
        }
    }

    private async pollRunStatus(threadId: string, runId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
        let attempts = 0;
        this.logger.debug(`Polling run status for Run ID: ${runId}...`);
        const terminalStates = ['completed', 'failed', 'cancelled', 'expired', 'requires_action']; // requires_action is also terminal for this use case

        while (attempts < this.maxPollingAttempts) {
            const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
            this.logger.debug(`Polling attempt ${attempts + 1}/${this.maxPollingAttempts}. Current run status: ${run.status}`);

            if (terminalStates.includes(run.status)) {
                return run; // Return the final run object
            }

            await sleep(this.pollIntervalMs);
            attempts++;
        }

        this.logger.error(`Polling timed out after ${this.maxPollingAttempts} attempts for run ${runId}.`);
        try {
            await this.openai.beta.threads.runs.cancel(threadId, runId);
            this.logger.warn(`Attempted to cancel timed-out run ${runId}.`);
        } catch (cancelError) {
            this.logger.error(`Failed to cancel timed-out run ${runId}: ${cancelError.message}`);
        }
        throw new Error(`Polling timed out waiting for assistant run ${runId} to complete.`);
    }

    private async cleanupResources(fileId: string | null, threadId: string | null) {
        const cleanupPromises: Promise<any>[] = [];

        if (fileId) {
            this.logger.debug(`Queueing deletion for uploaded file ID: ${fileId}`);
            cleanupPromises.push(
                this.openai.files.del(fileId).catch(err => {
                    this.logger.warn(`Failed to delete file ID ${fileId}: ${err.message}`);
                })
            );
        }
        if (threadId) {
            this.logger.debug(`Queueing deletion for thread ID: ${threadId}`);
            cleanupPromises.push(
                this.openai.beta.threads.del(threadId).catch(err => {
                    this.logger.warn(`Failed to delete thread ID ${threadId}: ${err.message}`);
                })
            );
        }

        if (cleanupPromises.length > 0) {
            await Promise.all(cleanupPromises);
            this.logger.debug('Cleanup tasks finished.');
        }
    }
} 
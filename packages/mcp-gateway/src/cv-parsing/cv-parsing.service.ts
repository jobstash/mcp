import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { NluService } from '../nlu/nlu.service';
import { McpClientService } from '../mcp-client/mcp-client.service';
import { UserProfile } from '../common/dtos/user-profile.dto';
import { CvJobData } from '../common/dtos/cv-job-data.dto'; // Assuming type mirroring/import
import { Express } from 'express'; // For Multer file type

@Injectable()
export class CvParsingService {
    private readonly logger = new Logger(CvParsingService.name);

    constructor(
        private readonly nluService: NluService,
        private readonly mcpClientService: McpClientService,
        // private configService: ConfigService // Inject if needed for OpenAI parsing API key
    ) { }

    async handleCvUpload(file: Express.Multer.File): Promise<{ jobstashUrl: string | null; userProfile: UserProfile | null }> {
        this.logger.log(`Handling CV upload: ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`);

        if (!file.buffer) {
            throw new HttpException('File buffer is missing', HttpStatus.BAD_REQUEST);
        }

        let cvText: string;
        try {
            // TODO: Implement actual file parsing (PDF/DOCX -> Text) using OpenAI API
            // This is a placeholder - assumes file is plain text for now
            this.logger.warn('Using placeholder text extraction (assuming plain text). Implement PDF/DOCX parsing.');
            cvText = file.buffer.toString('utf-8');
            // cvText = await this.parseCvFileWithOpenAI(file.buffer);
        } catch (parseError) {
            this.logger.error(`Failed to parse CV file: ${parseError.message}`, parseError.stack);
            throw new HttpException('Failed to parse CV file content', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!cvText || cvText.trim().length === 0) {
            throw new HttpException('Failed to extract text content from CV', HttpStatus.BAD_REQUEST);
        }

        let extractedCvJobData: CvJobData | null = null;
        let extractedUserProfile: UserProfile | null = null;
        try {
            const nluResult = await this.nluService.extractCvData(cvText);
            extractedCvJobData = nluResult.cvJobData;
            extractedUserProfile = nluResult.userProfile;
            this.logger.log('NLU extraction complete from CV text.');
        } catch (nluError) {
            this.logger.error(`NLU failed for CV text: ${nluError.message}`, nluError.stack);
            // Decide if we should proceed without NLU data or throw error
            throw new HttpException('Failed to extract data from CV text via NLU', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        let jobstashUrl: string | null = null;
        if (extractedCvJobData) {
            try {
                this.logger.log(`Calling MCP tool 'process_cv_job_data' with extracted job data...`);
                const mcpResult = await this.mcpClientService.callTool({
                    name: 'process_cv_job_data',
                    arguments: extractedCvJobData // Pass the structured job data
                });
                this.logger.log(`Received MCP Result: ${JSON.stringify(mcpResult)}`);

                // Parse the MCP response for the URL (similar to SearchUrlController)
                if (
                    mcpResult?.content &&
                    Array.isArray(mcpResult.content) &&
                    mcpResult.content.length > 0 &&
                    mcpResult.content[0]?.type === 'text' &&
                    typeof mcpResult.content[0]?.text === 'string'
                ) {
                    try {
                        const innerResult = JSON.parse(mcpResult.content[0].text);
                        jobstashUrl = innerResult?.jobstashUrl || null;
                    } catch (parseError) {
                        this.logger.error(`Failed to parse inner JSON from MCP response: ${parseError}`);
                        // jobstashUrl remains null
                    }
                }
                if (!jobstashUrl) {
                    this.logger.warn('Failed to extract jobstashUrl from MCP response.');
                }

            } catch (mcpError) {
                this.logger.error(`MCP tool call failed: ${mcpError.message}`, mcpError.stack);
                // Decide if failure to get URL is critical? For now, URL will be null.
            }
        } else {
            this.logger.warn('No CV job data extracted by NLU, skipping MCP tool call.');
        }

        // Return both extracted profile and potentially generated URL
        return { jobstashUrl, userProfile: extractedUserProfile };
    }

    // Placeholder for actual OpenAI parsing logic
    private async parseCvFileWithOpenAI(buffer: Buffer): Promise<string> {
        this.logger.log('Calling OpenAI to parse file buffer...');
        // TODO: Implement interaction with OpenAI API (e.g., Files API + Assistants or other method)
        // Requires careful handling of API keys, file uploads, processing, and error states.
        throw new Error('OpenAI file parsing not implemented.');
        // Example placeholder:
        // return "Parsed text content from OpenAI";
    }
} 
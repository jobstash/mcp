import { Injectable, Logger } from '@nestjs/common';
import { NluService } from '../nlu/nlu.service';
import { McpClientService } from '../mcp-client/mcp-client.service';
import { OpenAIFileParserService, FileParserInput } from '@jobstash/file-parser';
import { UserProfile } from '../common/dtos/user-profile.dto';
import { CvJobData } from '../common/dtos/cv-job-data.dto'; // Correct DTO path

// Define the expected structure of the MCP tool response for process_cv_job_data
interface McpProcessCvResponse {
    jobstashUrl: string;
}

@Injectable()
export class CvParsingService {
    private readonly logger = new Logger(CvParsingService.name);

    constructor(
        private readonly nluService: NluService,
        private readonly mcpClientService: McpClientService,
        // Injecting by class name, assumes OpenAIFileParserService is exported and provided by FileParserModule
        // Alternatively, inject by token: @Inject(FILE_PARSER_SERVICE) private readonly fileParserService: OpenAIFileParserService,
        private readonly fileParserService: OpenAIFileParserService,
    ) { }

    async handleCvUpload(file: Express.Multer.File): Promise<{ jobstashUrl: string | null; userProfile: UserProfile | null }> {
        this.logger.log(`Handling CV upload: ${file.originalname} (${(file.size / 1024).toFixed(2)} KB)`);

        const inputFile: FileParserInput = {
            buffer: file.buffer,
            originalname: file.originalname,
            mimetype: file.mimetype,
        };

        let cvText: string;
        try {
            cvText = await this.fileParserService.parse(inputFile);
            this.logger.log(`Successfully parsed CV to text. Text length: ${cvText.length}`);
        } catch (error) {
            this.logger.error(`Failed to parse CV file to text: ${error.message}`, error.stack);
            throw new Error(`Error parsing CV file: ${error.message}`); // Re-throw or handle appropriately
        }

        let nluResult: { cvJobData: CvJobData | null; userProfile: UserProfile | null };
        try {
            nluResult = await this.nluService.extractCvData(cvText);
            this.logger.log(`Successfully extracted NLU data from CV text.`);
            if (!nluResult.cvJobData) {
                this.logger.warn('NLU did not return cvJobData.');
                // Decide if this is an error or if we can proceed without it for some cases
            }
        } catch (error) {
            this.logger.error(`Failed to extract NLU data from CV text: ${error.message}`, error.stack);
            throw new Error(`Error processing CV content: ${error.message}`); // Re-throw or handle appropriately
        }

        let jobstashUrl: string | null = null;
        if (nluResult.cvJobData) {
            try {
                this.logger.log('Calling MCP tool process_cv_job_data with:', JSON.stringify(nluResult.cvJobData));

                // The CvJobData from NLU should align with the arguments of 'process_cv_job_data' tool
                // The MCP tool also accepts 'fullCvText'. If NLU is designed to provide it within CvJobData, it will be passed.
                // Otherwise, if 'fullCvText' is always needed by the MCP tool, it should be explicitly added here:
                // const mcpToolArgs = { ...nluResult.cvJobData, fullCvText: cvText };
                const mcpToolArgs = nluResult.cvJobData;

                const mcpRawResult = await this.mcpClientService.callTool({
                    name: 'process_cv_job_data',
                    arguments: mcpToolArgs as any,
                });

                let parsedMcpText: McpProcessCvResponse | null = null;

                if (
                    mcpRawResult?.content &&
                    Array.isArray(mcpRawResult.content) &&
                    mcpRawResult.content.length > 0 &&
                    mcpRawResult.content[0]?.type === 'text' &&
                    typeof mcpRawResult.content[0]?.text === 'string'
                ) {
                    try {
                        parsedMcpText = JSON.parse(mcpRawResult.content[0].text) as McpProcessCvResponse;
                    } catch (e) {
                        this.logger.error('Failed to parse JSON from MCP tool response text', { text: mcpRawResult.content[0].text, error: e });
                    }
                }

                if (parsedMcpText && typeof parsedMcpText.jobstashUrl === 'string') {
                    jobstashUrl = parsedMcpText.jobstashUrl;
                    this.logger.log(`Successfully received jobstashUrl from MCP: ${jobstashUrl}`);
                } else {
                    this.logger.warn('MCP tool response did not contain a valid jobstashUrl after parsing.', { rawResponse: mcpRawResult });
                }
            } catch (error) {
                this.logger.error(`Failed to call MCP tool or process its response: ${error.message}`, error.stack);
                // Don't throw here if userProfile might still be valuable, or decide error strategy
            }
        }

        return {
            jobstashUrl,
            userProfile: nluResult.userProfile,
        };
    }
} 
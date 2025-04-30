import {
  Body,
  Controller,
  Post,
  Logger,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { QueryDto } from '../common/dtos/query.dto';
import { NluService } from '../nlu/nlu.service';
import { McpClientService } from '../mcp-client/mcp-client.service';

@Controller('api/v1/jobs-search-url')
export class JobsSearchUrlController {
  private readonly logger = new Logger(JobsSearchUrlController.name);

  constructor(
    private readonly nluService: NluService,
    private readonly mcpClientService: McpClientService
  ) { }

  @Post()
  async handleQuery(@Body(new ValidationPipe()) body: QueryDto) {
    this.logger.log(`Received query: "${body.query}"`);

    try {
      this.logger.log('Performing NLU step via NluService...');
      const structuredArgs = await this.nluService.performNlu(body.query);
      this.logger.log(`NLU Extracted Args: ${JSON.stringify(structuredArgs)}`);

      this.logger.log('Calling MCP Host Server tool: get_search_jobs_url via McpClientService...');
      const mcpResult = await this.mcpClientService.callTool({
        name: 'get_search_jobs_url',
        arguments: structuredArgs
      });

      this.logger.log(`Received MCP Result: ${JSON.stringify(mcpResult)}`);

      let jobstashUrl: string | undefined;
      if (
        mcpResult?.content &&
        Array.isArray(mcpResult.content) &&
        mcpResult.content.length > 0 &&
        mcpResult.content[0]?.type === 'text' &&
        typeof mcpResult.content[0]?.text === 'string'
      ) {
        try {
          const innerResult = JSON.parse(mcpResult.content[0].text);
          jobstashUrl = innerResult?.jobstashUrl;
        } catch (parseError) {
          this.logger.error(
            `Failed to parse inner JSON from MCP response: ${parseError}`,
          );
        }
      }

      if (!jobstashUrl || typeof jobstashUrl !== 'string') {
        throw new Error(
          'Failed to extract valid jobstashUrl from MCP Host Server response.',
        );
      }

      return { jobstashUrl };

    } catch (error) {
      this.logger.error(`Error handling query: ${error.message}`, error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to process query',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 
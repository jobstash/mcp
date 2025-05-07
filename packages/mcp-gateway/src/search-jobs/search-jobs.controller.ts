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

@Controller('api/v1/search-jobs')
export class SearchJobsController {
  private readonly logger = new Logger(SearchJobsController.name);

  constructor(
    private readonly nluService: NluService,
    private readonly mcpClientService: McpClientService
  ) { }

  @Post()
  async handleQuery(@Body(new ValidationPipe()) body: QueryDto) {
    this.logger.log(`Received search-jobs query: "${body.query}"`);

    try {
      // 1. NLU Step: Use NluService
      this.logger.log('Performing NLU step via NluService...');
      const structuredArgs = await this.nluService.performNlu(body.query);
      this.logger.log(`NLU Extracted Args: ${JSON.stringify(structuredArgs)}`);

      // 2. MCP Client Step: Use McpClientService
      this.logger.log('Calling MCP Host Server tool: search_jobs via McpClientService...');
      const mcpResult = await this.mcpClientService.callTool({
        name: 'search_jobs',
        arguments: structuredArgs
      });

      this.logger.log(`Received MCP Result: ${JSON.stringify(mcpResult)}`);

      // 3. Extract and return the job list from the MCP response
      try {
        const responseText = mcpResult?.content?.[0]?.text;
        if (!responseText) {
          this.logger.error('MCP response content did not contain text for search_jobs.', mcpResult);
          throw new Error('Invalid response structure from MCP Host Server (missing text content).');
        }

        const parsedResponse = JSON.parse(responseText);
        const jobs = parsedResponse?.jobs;

        if (!Array.isArray(jobs)) {
          this.logger.error('Parsed MCP response for search_jobs did not contain a jobs array.', parsedResponse);
          throw new Error('Invalid response data from MCP Host Server (missing jobs array).');
        }
        return { jobs };
      } catch (error) {
        // Log the original error for more context if it's not a re-thrown HttpException
        if (!(error instanceof HttpException)) {
          this.logger.error(`Error processing MCP response for search_jobs: ${error.message}`, error.stack);
        }
        // Re-throw so NestJS can handle it consistently
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Failed to process search_jobs response from MCP Host',
            message: error.message, // Include the original error message
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error(`Error handling search-jobs query: ${error.message}`, error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to process search-jobs query',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 
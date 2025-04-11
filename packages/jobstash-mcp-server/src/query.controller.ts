import {
  Body,
  Controller,
  Post,
  Logger,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { McpManagerProviderService } from './mcp-manager-provider.service';
// import { JobstashService } from './jobstash.service'; // Temporarily comment out
import { IsNotEmpty, IsString } from 'class-validator';

// DTO for incoming request validation
export class QueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}

@Controller('api/v1/query')
export class QueryController {
  private readonly logger = new Logger(QueryController.name);

  constructor(
    private readonly mcpManagerProvider: McpManagerProviderService,
    // private readonly jobstashService: JobstashService, // Temporarily comment out
  ) {}

  @Post()
  async handleQuery(@Body(new ValidationPipe()) body: QueryDto) {
    this.logger.log(`Received query: "${body.query}"`);

    try {
      // 1. Get configured McpManager and process query
      const mcpManager = this.mcpManagerProvider.getManager();
      const structuredParams = await mcpManager.getStructuredData(body.query);
      this.logger.log(
        `MCP Extracted Params: ${JSON.stringify(structuredParams)}`,
      );

      // --- TEMPORARY: Return structured params directly for testing --- 
      // this.logger.warn('TEMP: Returning raw structured params from controller!');
      // return structuredParams;
      // --- END TEMPORARY ---
      
      // Temporarily commented out due to JobstashService issues
      this.logger.warn('JobStash API call and formatting are temporarily disabled.');
      return { message: "Query processed, JobStash interaction disabled.", structuredParams };
      /* 
      const jobstashParams = this.mapToJobstashParams(structuredParams);
      this.logger.log(
        `Mapped JobStash Params: ${JSON.stringify(jobstashParams)}`,
      );
      const jobstashResponse = await this.jobstashService.searchJobs(
        jobstashParams,
      );
      const formattedResponse = this.formatJobstashResponse(jobstashResponse);
      return formattedResponse;
      */
    } catch (error) {
      this.logger.error(`Error handling query: ${error.message}`, error.stack);
      // Throw a generic HTTP exception for now
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

  // --- Placeholder Helper Methods (to be implemented) ---

  private mapToJobstashParams(
    structuredParams: Record<string, any>,
  ): Record<string, any> {
    this.logger.warn('mapToJobstashParams: Using placeholder implementation!');
    const mapped = { ...structuredParams };
    return mapped;
  }

  private formatJobstashResponse(jobstashResponse: any): any {
    this.logger.warn(
      'formatJobstashResponse: Using placeholder implementation!',
    );
    return jobstashResponse?.data || [];
  }
} 
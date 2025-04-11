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
// No JobstashService import needed
import { IsNotEmpty, IsString } from 'class-validator';
import { URLSearchParams } from 'url'; // Use built-in URLSearchParams

// DTO for incoming request validation
export class QueryDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}

@Controller('api/v1/query')
export class QueryController {
  private readonly logger = new Logger(QueryController.name);
  private readonly jobstashBaseUrl = 'https://jobstash.xyz/jobs'; // Base URL for the website

  constructor(
    private readonly mcpManagerProvider: McpManagerProviderService,
    // No JobstashService injection needed
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

      // 2. Construct JobStash website URL query string
      const urlParams = this.buildUrlQueryString(structuredParams);
      const finalUrl = `${this.jobstashBaseUrl}?${urlParams}`;
      this.logger.log(`Constructed URL: ${finalUrl}`);

      // 3. Return the URL
      return { jobstashUrl: finalUrl };

    } catch (error) {
      this.logger.error(`Error handling query: ${error.message}`, error.stack);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to process query and construct URL',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Updated method to build URL query string
  private buildUrlQueryString(
    params: Record<string, any>,
  ): string {
    this.logger.log('Building URL query string...');
    const searchParams = new URLSearchParams();

    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] != null) {
        const value = params[key];
        if (Array.isArray(value)) {
          // Join array values with comma (as seen in example URL)
          if (value.length > 0) {
            searchParams.set(key, value.join(','));
          }
        } else {
          searchParams.set(key, String(value));
        }
      }
    }
    return searchParams.toString();
  }

} 
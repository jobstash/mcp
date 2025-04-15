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
import { QueryDto } from './jobstash-url.controller'; // Updated import path for shared DTO

@Controller('api/v1/parameters') // Changed route prefix for clarity
export class ParameterExtractionController { // Renamed class
  private readonly logger = new Logger(ParameterExtractionController.name); // Updated logger name

  constructor(
    private readonly mcpManagerProvider: McpManagerProviderService,
  ) {}

  @Post('extract') // Changed endpoint for clarity: /api/v1/parameters/extract
  async extractParams(@Body(new ValidationPipe()) body: QueryDto) {
    this.logger.log(
      `Debug extractParams received query: "${body.query}"`,
    );
    try {
      const mcpManager = this.mcpManagerProvider.getManager();
      const structuredParams = await mcpManager.getStructuredData(body.query);
      this.logger.log(
        `Debug extractParams returning: ${JSON.stringify(structuredParams)}`,
      );
      return structuredParams; // Return the raw structured data
    } catch (error) {
      this.logger.error(
        `Error in debug extractParams: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to extract parameters for debugging',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

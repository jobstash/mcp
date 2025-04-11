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
import { QueryDto } from './query.controller'; // Reuse the DTO from QueryController

@Controller('api/v1/structured-data') // Changed route prefix
export class StructuredDataController {
  private readonly logger = new Logger(StructuredDataController.name);

  constructor(
    private readonly mcpManagerProvider: McpManagerProviderService,
  ) {}

  @Post('extract-params') // Endpoint now: /api/v1/structured-data/extract-params
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

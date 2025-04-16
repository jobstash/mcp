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
  
  @Controller('api/v1/jobs')
  export class JobsListController {
    private readonly logger = new Logger(JobsListController.name);
  
    constructor(
      private readonly nluService: NluService,
      private readonly mcpClientService: McpClientService
    ) {}
  
    @Post('list')
    async handleQuery(@Body(new ValidationPipe()) body: QueryDto) {
      this.logger.log(`Received list query: "${body.query}"`);
  
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
        const jobs = mcpResult?.jobs;
        if (!jobs || !Array.isArray(jobs)) {
            throw new Error('Invalid response format from MCP Host Server (expected jobs array).');
        }
  
        return { jobs };
  
      } catch (error) {
        this.logger.error(`Error handling list query: ${error.message}`, error.stack);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Failed to process list query',
            message: error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  } 
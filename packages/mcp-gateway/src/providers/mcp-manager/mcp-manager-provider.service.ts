import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { McpManager, McpManagerConfig } from '@jobstash/mcp-server';
import * as path from 'path';
import { processFilterDefinitions } from './filter-processor';

@Injectable()
export class McpManagerProviderService implements OnModuleInit {
  private readonly logger = new Logger(McpManagerProviderService.name);
  private mcpManagerInstance: McpManager;
  private filtersFilePath = path.join(__dirname, '../../../filters.json');

  async onModuleInit() {
    await this.initializeManager();
  }

  private async initializeManager() {
    this.logger.log('Initializing McpManager...');
    let relevantFilterData: any[] = [];
    try {
      relevantFilterData = processFilterDefinitions(this.filtersFilePath);
    } catch (error) {
      this.logger.error(
        `Failed during filter file processing at ${this.filtersFilePath}: ${error.message}`,
        error.stack
      );
      relevantFilterData = [];
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      this.logger.error('OPENAI_API_KEY environment variable not found!');
      throw new Error(
        'Configuration error: OPENAI_API_KEY environment variable not set.',
      );
    }

    const config: McpManagerConfig = { 
      name: 'jobstash-mcp-server-integration',
      version: '0.1.0',
      supportedFilters: relevantFilterData,
    };

    try {
      this.mcpManagerInstance = new McpManager(config);
      this.logger.log('Successfully initialized McpManager instance.');
    } catch (error) {
      this.logger.error(
        `Failed to initialize McpManager instance: ${error.message}`,
        error.stack,
      );
      throw error; 
    }
  }

  getManager(): McpManager {
    if (!this.mcpManagerInstance) {
      this.logger.error('Attempted to get McpManager before initialization!');
      throw new Error('McpManager is not initialized.');
    }
    return this.mcpManagerInstance;
  }
}

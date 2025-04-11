import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { McpManager, McpManagerConfig } from '@jobstash/mcp';
import * as path from 'path';
import { processFilterDefinitions } from './utils/filter-processor';
import * as fs from 'fs';

@Injectable()
export class McpManagerProviderService implements OnModuleInit {
  private readonly logger = new Logger(McpManagerProviderService.name);
  private mcpManagerInstance: McpManager;
  private filtersFilePath = path.join(__dirname, '../filters.json');

  async onModuleInit() {
    this.logger.log('OnModuleInit hook called.');
    await this.initializeManager();
  }

  private async initializeManager() {
    this.logger.log('Initializing McpManager...');
    let relevantFilterData: any[] = [];
    try {
      this.logger.log(`Attempting to read filters file: ${this.filtersFilePath}`);
      const filtersJson = fs.readFileSync(this.filtersFilePath, 'utf-8');
      this.logger.log('Successfully read filters file.');
      
      this.logger.log('Attempting to parse filters JSON...');
      const filtersData = JSON.parse(filtersJson);
      this.logger.log('Successfully parsed filters JSON.');
      
      this.logger.log('Processing filter definitions...');
      relevantFilterData = processFilterDefinitions(this.filtersFilePath);
      this.logger.log(`Finished processing ${relevantFilterData.length} filters.`);

    } catch (error) {
      this.logger.error(
        `Failed during filter file processing at ${this.filtersFilePath}: ${error.message}`,
        error.stack // Log stack trace for file errors
      );
      relevantFilterData = []; // Fallback or rethrow
      // Potentially rethrow here if filters are critical
      // throw new Error(`Fatal: Could not load filter configuration.`);
    }

    this.logger.log('Checking for OPENAI_API_KEY...');
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      this.logger.error('OPENAI_API_KEY environment variable not found!');
      throw new Error(
        'Configuration error: OPENAI_API_KEY environment variable not set.',
      );
    }
    this.logger.log('OPENAI_API_KEY found.');

    const config: McpManagerConfig = { 
      name: 'jobstash-mcp-server-integration',
      version: '0.1.0',
      supportedFilters: relevantFilterData,
    };

    this.logger.log(
      `Attempting to initialize McpManager instance with ${relevantFilterData.length} filter definitions.`,
    );
    try {
      this.mcpManagerInstance = new McpManager(config);
      this.logger.log('Successfully initialized McpManager instance.');
    } catch (error) {
      this.logger.error(
        `Failed to initialize McpManager instance: ${error.message}`,
        error.stack,
      );
      throw error; // Rethrow error to prevent module from loading successfully
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

import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { JobstashModule } from './jobstash.module';
import { McpManagerProviderModule } from './mcp-manager-provider.module';

@Module({
  imports: [
    McpManagerProviderModule, // Provides McpManagerProviderService
    JobstashModule, // Provides JobstashService
  ],
  controllers: [QueryController],
})
export class QueryModule {} 
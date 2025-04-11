import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { McpManagerProviderModule } from './mcp-manager-provider.module';

@Module({
  imports: [
    McpManagerProviderModule, // Provides McpManagerProviderService
  ],
  controllers: [QueryController],
})
export class QueryModule {} 
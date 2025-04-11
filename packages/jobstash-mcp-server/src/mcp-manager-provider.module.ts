import { Module } from '@nestjs/common';
import { McpManagerProviderService } from './mcp-manager-provider.service';
 
@Module({
  providers: [McpManagerProviderService],
  exports: [McpManagerProviderService],
})
export class McpManagerProviderModule {} 
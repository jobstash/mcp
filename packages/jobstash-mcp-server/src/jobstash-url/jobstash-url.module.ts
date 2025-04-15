import { Module } from '@nestjs/common';
import { JobStashUrlController } from './jobstash-url.controller';
import { McpManagerProviderModule } from '../mcp-manager-provider.module';

@Module({
  imports: [
    McpManagerProviderModule, 
  ],
  controllers: [JobStashUrlController],
})
export class JobStashUrlModule {} 
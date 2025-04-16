import { Module } from '@nestjs/common';
import { JobsSearchUrlController } from './jobs-search-url.controller';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';

@Module({
  imports: [NluModule, McpClientModule],
  controllers: [JobsSearchUrlController],
  providers: [],
})
export class JobsSearchUrlModule {} 
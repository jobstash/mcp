import { Module } from '@nestjs/common';
import { JobListController } from './job-list.controller';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';

@Module({
  imports: [NluModule, McpClientModule],
  controllers: [JobListController],
  providers: [],
})
export class JobListModule {} 
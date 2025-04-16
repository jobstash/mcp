import { Module } from '@nestjs/common';
import { JobsListController } from './jobs-list.controller';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';

@Module({
  imports: [NluModule, McpClientModule],
  controllers: [JobsListController],
  providers: [],
})
export class JobsListModule {} 
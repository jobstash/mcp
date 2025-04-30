import { Module } from '@nestjs/common';
import { SearchJobsController } from './search-jobs.controller';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';

@Module({
  imports: [NluModule, McpClientModule],
  controllers: [SearchJobsController],
  providers: [],
})
export class SearchJobsModule { } 
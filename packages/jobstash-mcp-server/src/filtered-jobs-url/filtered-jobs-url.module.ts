import { Module } from '@nestjs/common';
import { FilteredJobsUrlController } from './filtered-jobs-url.controller';
import { McpManagerProviderModule } from '../providers/mcp-manager/mcp-manager-provider.module';

@Module({
  imports: [McpManagerProviderModule],
  controllers: [FilteredJobsUrlController],
  providers: [],
})
export class FilteredJobsUrlModule {} 
import { Module } from '@nestjs/common';
import { SearchUrlController } from './search-url.controller';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';

@Module({
  imports: [NluModule, McpClientModule],
  controllers: [SearchUrlController],
  providers: [],
})
export class SearchUrlModule { } 
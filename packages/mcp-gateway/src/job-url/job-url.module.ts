import { Module } from '@nestjs/common';
import { JobUrlController } from './job-url.controller';
import { NluModule } from '../nlu/nlu.module';
import { McpClientModule } from '../mcp-client/mcp-client.module';

@Module({
  imports: [NluModule, McpClientModule],
  controllers: [JobUrlController],
  providers: [],
})
export class JobUrlModule {} 
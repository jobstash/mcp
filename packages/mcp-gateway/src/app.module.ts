import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobUrlModule } from './job-url/job-url.module';
import { JobListModule } from './job-list/job-list.module';
import { NluModule } from './nlu/nlu.module';
import { McpClientModule } from './mcp-client/mcp-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    JobUrlModule,
    JobListModule,
    NluModule,
    McpClientModule,
  ],
})
export class AppModule {}

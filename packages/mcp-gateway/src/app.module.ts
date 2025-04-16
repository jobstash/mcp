import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsListModule } from './jobs-list/jobs-list.module';
import { JobsSearchUrlModule } from './jobs-search-url/jobs-search-url.module';
import { NluModule } from './nlu/nlu.module';
import { McpClientModule } from './mcp-client/mcp-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    JobsListModule,
    JobsSearchUrlModule,
    NluModule,
    McpClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

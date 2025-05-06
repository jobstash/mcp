import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchJobsModule } from './search-jobs/search-jobs.module';
import { SearchUrlModule } from './search-url/search-url.module';
import { NluModule } from './nlu/nlu.module';
import { McpClientModule } from './mcp-client/mcp-client.module';
import { CvParsingModule } from './cv-parsing/cv-parsing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    SearchJobsModule,
    SearchUrlModule,
    NluModule,
    McpClientModule,
    CvParsingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

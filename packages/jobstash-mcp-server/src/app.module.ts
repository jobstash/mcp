import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobStashUrlModule } from './jobstash-url.module';
import { ParameterExtractionModule } from './parameter-extraction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    JobStashUrlModule,
    ParameterExtractionModule,
  ],
})
export class AppModule {}

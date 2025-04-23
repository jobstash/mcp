import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilteredJobsUrlModule } from './filtered-jobs-url/filtered-jobs-url.module';
import { ParameterExtractionModule } from './parameter-extraction/parameter-extraction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    FilteredJobsUrlModule,
    ParameterExtractionModule,
  ],
})
export class AppModule {}

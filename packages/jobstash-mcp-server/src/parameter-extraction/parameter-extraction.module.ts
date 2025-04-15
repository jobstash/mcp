import { Module } from '@nestjs/common';
import { ParameterExtractionController } from './parameter-extraction.controller';
import { McpManagerProviderModule } from '../providers';

@Module({
  imports: [McpManagerProviderModule],
  controllers: [ParameterExtractionController],
})
export class ParameterExtractionModule {}

import { Module } from '@nestjs/common';
import { StructuredDataController } from './structured-data.controller';
import { McpManagerProviderModule } from './mcp-manager-provider.module';

@Module({
  imports: [McpManagerProviderModule],
  controllers: [StructuredDataController],
})
export class StructuredDataModule {}

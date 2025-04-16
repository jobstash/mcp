import { Test, TestingModule } from '@nestjs/testing';
import { ParameterExtractionController } from './parameter-extraction.controller';
import { McpManagerProviderModule } from '../providers/mcp-manager/mcp-manager-provider.module';

describe('ParameterExtractionController', () => {
  let controller: ParameterExtractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [McpManagerProviderModule],
      controllers: [ParameterExtractionController],
    }).compile();

    controller = module.get<ParameterExtractionController>(ParameterExtractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ParameterExtractionController } from './parameter-extraction.controller';

describe('ParameterExtractionController', () => {
  let controller: ParameterExtractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParameterExtractionController],
    }).compile();

    controller = module.get<ParameterExtractionController>(ParameterExtractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

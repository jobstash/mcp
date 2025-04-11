import { Test, TestingModule } from '@nestjs/testing';
import { StructuredDataController } from './structured-data.controller';

describe('StructuredDataController', () => {
  let controller: StructuredDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StructuredDataController],
    }).compile();

    controller = module.get<StructuredDataController>(StructuredDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

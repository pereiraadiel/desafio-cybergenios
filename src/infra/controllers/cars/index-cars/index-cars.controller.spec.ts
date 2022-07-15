import { Test, TestingModule } from '@nestjs/testing';
import { IndexCarsController } from './index-cars.controller';

describe('IndexCarsController', () => {
  let controller: IndexCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndexCarsController],
    }).compile();

    controller = module.get<IndexCarsController>(IndexCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

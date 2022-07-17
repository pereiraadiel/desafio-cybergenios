import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { IndexCarsService } from '@usecases/cars/index-cars/index-cars.service';
import { IndexCarsController } from './index-cars.controller';

describe('IndexCarsController', () => {
  let controller: IndexCarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndexCarsController],
      providers: [PrismaService, IndexCarsService],
    }).compile();

    controller = module.get<IndexCarsController>(IndexCarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

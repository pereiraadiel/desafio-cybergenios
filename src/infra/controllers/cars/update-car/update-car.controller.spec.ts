import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { UpdateCarService } from '@usecases/cars/update-car/update-car.service';
import { UpdateCarController } from './update-car.controller';

describe('UpdateCarController', () => {
  let controller: UpdateCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCarController],
      providers: [PrismaService, UpdateCarService],
    }).compile();

    controller = module.get<UpdateCarController>(UpdateCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

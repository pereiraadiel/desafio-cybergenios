import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { GetCarService } from '@usecases/cars/get-car/get-car.service';
import { GetCarController } from './get-car.controller';

describe('GetCarController', () => {
  let controller: GetCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCarController],
      providers: [PrismaService, GetCarService],
    }).compile();

    controller = module.get<GetCarController>(GetCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

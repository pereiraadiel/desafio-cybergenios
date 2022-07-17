import { Test, TestingModule } from '@nestjs/testing';
import { CreateCarService } from '@usecases/cars/create-car/create-car.service';
import { PrismaService } from '@infra/config/PrismaService';
import { CreateCarController } from './create-car.controller';

describe('CreateCarController', () => {
  let controller: CreateCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCarController],
      providers: [PrismaService, CreateCarService],
    }).compile();

    controller = module.get<CreateCarController>(CreateCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

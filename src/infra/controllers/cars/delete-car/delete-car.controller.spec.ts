import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { DeleteCarService } from '@usecases/cars/delete-car/delete-car.service';
import { DeleteCarController } from './delete-car.controller';

describe('DeleteCarController', () => {
  let controller: DeleteCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCarController],
      providers: [PrismaService, DeleteCarService],
    }).compile();

    controller = module.get<DeleteCarController>(DeleteCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

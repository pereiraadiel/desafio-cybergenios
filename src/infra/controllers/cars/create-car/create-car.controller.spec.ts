import { Test, TestingModule } from '@nestjs/testing';
import { CreateCarController } from './create-car.controller';

describe('CreateCarController', () => {
  let controller: CreateCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCarController],
    }).compile();

    controller = module.get<CreateCarController>(CreateCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

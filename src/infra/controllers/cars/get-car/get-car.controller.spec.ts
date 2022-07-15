import { Test, TestingModule } from '@nestjs/testing';
import { GetCarController } from './get-car.controller';

describe('GetCarController', () => {
  let controller: GetCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCarController],
    }).compile();

    controller = module.get<GetCarController>(GetCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

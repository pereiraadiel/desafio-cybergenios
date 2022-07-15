import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCarController } from './update-car.controller';

describe('UpdateCarController', () => {
  let controller: UpdateCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCarController],
    }).compile();

    controller = module.get<UpdateCarController>(UpdateCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

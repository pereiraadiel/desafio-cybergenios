import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCarController } from './delete-car.controller';

describe('DeleteCarController', () => {
  let controller: DeleteCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCarController],
    }).compile();

    controller = module.get<DeleteCarController>(DeleteCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

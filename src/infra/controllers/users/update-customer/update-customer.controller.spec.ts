import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCustomerController } from './update-customer.controller';

describe('UpdateCustomerController', () => {
  let controller: UpdateCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCustomerController],
    }).compile();

    controller = module.get<UpdateCustomerController>(UpdateCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

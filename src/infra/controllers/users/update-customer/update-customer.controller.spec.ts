import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { UpdateCustomerService } from '@usecases/users/update-customer/update-customer.service';
import { UpdateCustomerController } from './update-customer.controller';

describe('UpdateCustomerController', () => {
  let controller: UpdateCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateCustomerController],
      providers: [PrismaService, UpdateCustomerService],
    }).compile();

    controller = module.get<UpdateCustomerController>(UpdateCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

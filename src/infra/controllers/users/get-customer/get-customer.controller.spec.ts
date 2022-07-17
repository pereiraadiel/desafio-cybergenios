import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { GetCustomerService } from '@usecases/users/get-customer/get-customer.service';
import { GetCustomerController } from './get-customer.controller';

describe('GetCustomerController', () => {
  let controller: GetCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCustomerController],
      providers: [PrismaService, GetCustomerService],
    }).compile();

    controller = module.get<GetCustomerController>(GetCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

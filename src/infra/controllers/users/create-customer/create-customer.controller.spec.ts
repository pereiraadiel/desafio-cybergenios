import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerService } from '@usecases/users/create-customer/create-customer.service';
import { PrismaService } from '@infra/config/PrismaService';
import { CreateCustomerController } from './create-customer.controller';

describe('CreateCustomerController', () => {
  let controller: CreateCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCustomerController],
      providers: [PrismaService, CreateCustomerService],
    }).compile();

    controller = module.get<CreateCustomerController>(CreateCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { DeleteCustomerService } from '@usecases/users/delete-customer/delete-customer.service';
import { DeleteCustomerController } from './delete-customer.controller';

describe('DeleteCustomerController', () => {
  let controller: DeleteCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCustomerController],
      providers: [PrismaService, DeleteCustomerService],
    }).compile();

    controller = module.get<DeleteCustomerController>(DeleteCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

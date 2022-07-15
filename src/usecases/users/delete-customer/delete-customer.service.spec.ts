import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCustomerService } from './delete-customer.service';

describe('DeleteCustomerService', () => {
  let service: DeleteCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCustomerService],
    }).compile();

    service = module.get<DeleteCustomerService>(DeleteCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

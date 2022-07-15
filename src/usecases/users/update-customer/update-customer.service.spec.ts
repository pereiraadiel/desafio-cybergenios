import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCustomerService } from './update-customer.service';

describe('UpdateCustomerService', () => {
  let service: UpdateCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCustomerService],
    }).compile();

    service = module.get<UpdateCustomerService>(UpdateCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

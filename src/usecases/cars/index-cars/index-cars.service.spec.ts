import { Test, TestingModule } from '@nestjs/testing';
import { IndexCarsService } from './index-cars.service';

describe('IndexCarsService', () => {
  let service: IndexCarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexCarsService],
    }).compile();

    service = module.get<IndexCarsService>(IndexCarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreateCarService } from './create-car.service';

describe('CreateCarService', () => {
  let service: CreateCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCarService],
    }).compile();

    service = module.get<CreateCarService>(CreateCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GetCarService } from './get-car.service';

describe('GetCarService', () => {
  let service: GetCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCarService],
    }).compile();

    service = module.get<GetCarService>(GetCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

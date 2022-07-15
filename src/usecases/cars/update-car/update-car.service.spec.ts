import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCarService } from './update-car.service';

describe('UpdateCarService', () => {
  let service: UpdateCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCarService],
    }).compile();

    service = module.get<UpdateCarService>(UpdateCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

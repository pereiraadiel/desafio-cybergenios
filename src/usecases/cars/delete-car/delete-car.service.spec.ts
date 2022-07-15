import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCarService } from './delete-car.service';

describe('DeleteCarService', () => {
  let service: DeleteCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCarService],
    }).compile();

    service = module.get<DeleteCarService>(DeleteCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AssignAdminService } from './assign-admin.service';

describe('AssignAdminService', () => {
  let service: AssignAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignAdminService],
    }).compile();

    service = module.get<AssignAdminService>(AssignAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

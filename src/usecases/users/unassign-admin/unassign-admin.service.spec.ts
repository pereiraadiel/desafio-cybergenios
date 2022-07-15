import { Test, TestingModule } from '@nestjs/testing';
import { UnassignAdminService } from './unassign-admin.service';

describe('UnassignAdminService', () => {
  let service: UnassignAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnassignAdminService],
    }).compile();

    service = module.get<UnassignAdminService>(UnassignAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

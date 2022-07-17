import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { UnassignAdminService } from '@usecases/users/unassign-admin/unassign-admin.service';
import { UnassignAdminController } from './unassign-admin.controller';

describe('UnassignAdminController', () => {
  let controller: UnassignAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnassignAdminController],
      providers: [PrismaService, UnassignAdminService],
    }).compile();

    controller = module.get<UnassignAdminController>(UnassignAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

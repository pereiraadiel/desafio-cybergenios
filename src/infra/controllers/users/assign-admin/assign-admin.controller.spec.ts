import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { AssignAdminService } from '@usecases/users/assign-admin/assign-admin.service';
import { AssignAdminController } from './assign-admin.controller';

describe('AssignAdminController', () => {
  let controller: AssignAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignAdminController],
      providers: [PrismaService, AssignAdminService],
    }).compile();

    controller = module.get<AssignAdminController>(AssignAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

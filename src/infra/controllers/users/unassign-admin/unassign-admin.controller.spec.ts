import { Test, TestingModule } from '@nestjs/testing';
import { UnassignAdminController } from './unassign-admin.controller';

describe('UnassignAdminController', () => {
  let controller: UnassignAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnassignAdminController],
    }).compile();

    controller = module.get<UnassignAdminController>(UnassignAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

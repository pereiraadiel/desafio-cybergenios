import { Test, TestingModule } from '@nestjs/testing';
import { AssignAdminController } from './assign-admin.controller';

describe('AssignAdminController', () => {
  let controller: AssignAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignAdminController],
    }).compile();

    controller = module.get<AssignAdminController>(AssignAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

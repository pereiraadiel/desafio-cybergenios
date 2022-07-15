import { Controller, Param, Patch } from '@nestjs/common';
import { AssignAdminService } from '@usecases/users/assign-admin/assign-admin.service';

@Controller('admin')
export class AssignAdminController {
  constructor(private readonly assignAdminService: AssignAdminService) {}

  @Patch('/assign/:id')
  handle(@Param('id') id: string) {
    return this.assignAdminService.execute(id);
  }
}

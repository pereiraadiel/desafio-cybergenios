import { Controller, Param, Patch } from '@nestjs/common';
import { UnassignAdminService } from '@usecases/users/unassign-admin/unassign-admin.service';

@Controller('admin')
export class UnassignAdminController {
  constructor(private readonly unassignAdminService: UnassignAdminService) {}

  @Patch('/unassign/:id')
  handle(@Param('id') id: string) {
    return this.unassignAdminService.execute(id);
  }
}

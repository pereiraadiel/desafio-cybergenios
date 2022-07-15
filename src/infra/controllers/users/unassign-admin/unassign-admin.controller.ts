import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnassignAdminService } from '@usecases/users/unassign-admin/unassign-admin.service';

@Controller('admin')
export class UnassignAdminController {
  constructor(private readonly unassignAdminService: UnassignAdminService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('/unassign/:id')
  handle(@Param('id') id: string) {
    return this.unassignAdminService.execute(id);
  }
}

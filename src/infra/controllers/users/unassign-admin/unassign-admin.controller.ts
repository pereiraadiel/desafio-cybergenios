import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnassignAdminService } from '@usecases/users/unassign-admin/unassign-admin.service';
import { Role } from '@infra/authorization/roles.enum';
import { Roles } from '@infra/authorization/roles.decorator';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('admin')
export class UnassignAdminController {
  constructor(private readonly unassignAdminService: UnassignAdminService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Patch('/unassign/:id')
  handle(@Param('id') id: string) {
    return this.unassignAdminService.execute(id);
  }
}

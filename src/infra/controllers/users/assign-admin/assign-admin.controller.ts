import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssignAdminService } from '@usecases/users/assign-admin/assign-admin.service';
import { Roles } from '@infra/authorization/roles.decorator';
import { Role } from '@infra/authorization/roles.enum';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('admin')
export class AssignAdminController {
  constructor(private readonly assignAdminService: AssignAdminService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Patch('/assign/:id')
  handle(@Param('id') id: string) {
    return this.assignAdminService.execute(id);
  }
}

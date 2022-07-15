import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssignAdminService } from '@usecases/users/assign-admin/assign-admin.service';

@Controller('admin')
export class AssignAdminController {
  constructor(private readonly assignAdminService: AssignAdminService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('/assign/:id')
  handle(@Param('id') id: string) {
    return this.assignAdminService.execute(id);
  }
}

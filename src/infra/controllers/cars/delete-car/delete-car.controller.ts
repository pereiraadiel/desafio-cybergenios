import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteCarService } from '@usecases/cars/delete-car/delete-car.service';
import { Roles } from '@infra/authorization/roles.decorator';
import { Role } from '@infra/authorization/roles.enum';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('cars')
export class DeleteCarController {
  constructor(private readonly deleteCarService: DeleteCarService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.deleteCarService.execute(id);
  }
}

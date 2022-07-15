import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarDTO } from '@interfaces/car.dto';
import { UpdateCarService } from '@usecases/cars/update-car/update-car.service';
import { Role } from '@infra/authorization/roles.enum';
import { Roles } from '@infra/authorization/roles.decorator';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('cars')
export class UpdateCarController {
  constructor(private readonly updateCarService: UpdateCarService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: Partial<CarDTO>) {
    return this.updateCarService.execute(id, data);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCarService } from '@usecases/cars/create-car/create-car.service';
import { CarDTO } from '@interfaces/car.dto';
import { Roles } from '@infra/authorization/roles.decorator';
import { Role } from '@infra/authorization/roles.enum';
import { RolesGuard } from '@infra/authorization/roles.guard';

@Controller('cars')
export class CreateCarController {
  constructor(private readonly createCarService: CreateCarService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Post()
  handle(@Body() data: CarDTO) {
    return this.createCarService.execute(data);
  }
}

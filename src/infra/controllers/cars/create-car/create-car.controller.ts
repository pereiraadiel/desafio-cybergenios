import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCarService } from '@usecases/cars/create-car/create-car.service';
import { CarDTO } from '@interfaces/car.dto';

@Controller('cars')
export class CreateCarController {
  constructor(private readonly createCarService: CreateCarService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  handle(@Body() data: CarDTO) {
    return this.createCarService.execute(data);
  }
}

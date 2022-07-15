import { Body, Controller, Post } from '@nestjs/common';
import { CreateCarService } from '@usecases/cars/create-car/create-car.service';
import { CarDTO } from '@interfaces/car.dto';

@Controller('cars')
export class CreateCarController {
  constructor(private readonly createCarService: CreateCarService) {}

  @Post()
  handle(@Body() data: CarDTO) {
    return this.createCarService.execute(data);
  }
}

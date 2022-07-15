import { Controller, Get, Param } from '@nestjs/common';
import { GetCarService } from '@usecases/cars/get-car/get-car.service';

@Controller('cars')
export class GetCarController {
  constructor(private readonly getCarService: GetCarService) {}

  @Get(':id')
  handle(@Param('id') id: string) {
    return this.getCarService.execute(id);
  }
}

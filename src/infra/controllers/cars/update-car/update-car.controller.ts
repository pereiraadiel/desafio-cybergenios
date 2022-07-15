import { CarDTO } from '@interfaces/car.dto';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateCarService } from '@usecases/cars/update-car/update-car.service';

@Controller('cars')
export class UpdateCarController {
  constructor(private readonly updateCarService: UpdateCarService) {}

  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: Partial<CarDTO>) {
    return this.updateCarService.execute(id, data);
  }
}

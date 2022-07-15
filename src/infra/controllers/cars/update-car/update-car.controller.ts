import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarDTO } from '@interfaces/car.dto';
import { UpdateCarService } from '@usecases/cars/update-car/update-car.service';

@Controller('cars')
export class UpdateCarController {
  constructor(private readonly updateCarService: UpdateCarService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  handle(@Param('id') id: string, @Body() data: Partial<CarDTO>) {
    return this.updateCarService.execute(id, data);
  }
}

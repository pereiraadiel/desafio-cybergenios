import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCarService } from '@usecases/cars/get-car/get-car.service';

@Controller('cars')
export class GetCarController {
  constructor(private readonly getCarService: GetCarService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  handle(@Param('id') id: string) {
    return this.getCarService.execute(id);
  }
}

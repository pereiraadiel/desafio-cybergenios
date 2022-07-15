import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarFilterDTO } from '@interfaces/car-filter.dto';
import { IndexCarsService } from '@usecases/cars/index-cars/index-cars.service';

@Controller('cars')
export class IndexCarsController {
  constructor(private readonly indexCarsService: IndexCarsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  handle(@Query() filters: CarFilterDTO) {
    return this.indexCarsService.execute({
      ...filters,
      page: +filters.page,
      take: +filters.take,
    });
  }
}

import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteCarService } from '@usecases/cars/delete-car/delete-car.service';

@Controller('cars')
export class DeleteCarController {
  constructor(private readonly deleteCarService: DeleteCarService) {}

  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.deleteCarService.execute(id);
  }
}

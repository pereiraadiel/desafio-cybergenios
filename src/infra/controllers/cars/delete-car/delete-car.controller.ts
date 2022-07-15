import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteCarService } from '@usecases/cars/delete-car/delete-car.service';

@Controller('cars')
export class DeleteCarController {
  constructor(private readonly deleteCarService: DeleteCarService) {}

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  handle(@Param('id') id: string) {
    return this.deleteCarService.execute(id);
  }
}

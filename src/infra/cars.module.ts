import { Module } from '@nestjs/common';
import { CreateCarController } from './controllers/cars/create-car/create-car.controller';
import { DeleteCarController } from './controllers/cars/delete-car/delete-car.controller';
import { GetCarController } from './controllers/cars/get-car/get-car.controller';
import { UpdateCarController } from './controllers/cars/update-car/update-car.controller';

@Module({
  controllers: [
    CreateCarController,
    GetCarController,
    UpdateCarController,
    DeleteCarController,
  ],
  providers: [],
})
export class CarsModule {}
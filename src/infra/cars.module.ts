import { Module } from '@nestjs/common';
import { CreateCarController } from './controllers/cars/create-car/create-car.controller';
import { DeleteCarController } from './controllers/cars/delete-car/delete-car.controller';
import { GetCarController } from './controllers/cars/get-car/get-car.controller';
import { IndexCarsController } from './controllers/cars/index-cars/index-cars.controller';
import { UpdateCarController } from './controllers/cars/update-car/update-car.controller';

import { PrismaService } from '@infra/config/PrismaService';
import { CreateCarService } from '@usecases/cars/create-car/create-car.service';
import { GetCarService } from '@usecases/cars/get-car/get-car.service';
import { IndexCarsService } from '@usecases/cars/index-cars/index-cars.service';
import { UpdateCarService } from '@usecases/cars/update-car/update-car.service';
import { DeleteCarService } from '@usecases/cars/delete-car/delete-car.service';

@Module({
  controllers: [
    CreateCarController,
    GetCarController,
    IndexCarsController,
    UpdateCarController,
    DeleteCarController,
  ],
  providers: [
    CreateCarService,
    GetCarService,
    IndexCarsService,
    DeleteCarService,
    UpdateCarService,
    PrismaService,
  ],
})
export class CarsModule {}

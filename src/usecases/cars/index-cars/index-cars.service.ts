import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';
import { CarFilterDTO } from '@interfaces/car-filter.dto';

@Injectable()
export class IndexCarsService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ name, brand, page = 0, take = 10 }: CarFilterDTO) {
    const skip = take * page;
    const cars = await this.prisma.car.findMany({
      where: {
        name: {
          contains: name,
        },
        brand: {
          contains: brand,
        },
      },
      skip,
      take,
    });
    return cars;
  }
}

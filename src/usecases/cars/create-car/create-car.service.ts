import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';
import { CarDTO } from '@interfaces/car.dto';

@Injectable()
export class CreateCarService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(data: CarDTO) {
    return this.prisma.car.create({
      data,
    });
  }
}

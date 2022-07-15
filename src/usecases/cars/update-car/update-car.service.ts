import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';
import { CarDTO } from '@interfaces/car.dto';

@Injectable()
export class UpdateCarService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, data: Partial<CarDTO>) {
    const carExists = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });

    if (!carExists)
      throw new HttpException('car does not exists', HttpStatus.BAD_REQUEST);

    return await this.prisma.car.update({
      where: {
        id,
      },
      data,
    });
  }
}

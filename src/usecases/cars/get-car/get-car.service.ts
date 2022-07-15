import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';

@Injectable()
export class GetCarService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });
    if (!car)
      throw new HttpException('car does not exists', HttpStatus.BAD_REQUEST);

    return car;
  }
}

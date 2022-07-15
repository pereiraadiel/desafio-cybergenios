import { PrismaService } from '@infra/config/PrismaService';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DeleteCarService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const carExists = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });
    if (!carExists)
      throw new HttpException('car does not exists', HttpStatus.BAD_REQUEST);

    await this.prisma.car.delete({
      where: {
        id,
      },
    });
  }
}

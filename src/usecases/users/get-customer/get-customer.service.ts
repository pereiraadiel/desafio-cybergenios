import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';

@Injectable()
export class GetCustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const customer = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!customer)
      throw new HttpException(
        'customer does not exists',
        HttpStatus.BAD_REQUEST,
      );

    return customer;
  }
}

import { PrismaService } from '@infra/config/PrismaService';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class DeleteCustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const customerExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!customerExists) {
      throw new HttpException(
        'customer does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

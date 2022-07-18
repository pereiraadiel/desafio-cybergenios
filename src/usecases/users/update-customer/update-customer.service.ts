import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from '@interfaces/user.dto';
import { PrismaService } from '@infra/config/PrismaService';

@Injectable()
export class UpdateCustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, data: Partial<UserDTO>) {
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

    const customer = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
    customer.password = undefined;
    return customer;
  }
}

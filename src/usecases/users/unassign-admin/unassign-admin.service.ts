import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';

@Injectable()
export class UnassignAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user)
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);

    const customer = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        role: 'customer',
      },
    });
    return customer;
  }
}

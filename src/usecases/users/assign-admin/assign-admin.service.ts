import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';

@Injectable()
export class AssignAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user)
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        role: 'admin',
      },
    });
  }
}

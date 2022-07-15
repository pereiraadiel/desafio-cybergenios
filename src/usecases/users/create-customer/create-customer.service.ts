import { UserDTO } from '@interfaces/user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';

@Injectable()
export class CreateCustomerService {
  constructor(private prisma: PrismaService) {}

  async execute(data: UserDTO) {
    let customerAlreadyExists = await this.prisma.user.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (customerAlreadyExists)
      throw new HttpException('CPF already registered', HttpStatus.BAD_REQUEST);

    customerAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (customerAlreadyExists) {
      throw new HttpException(
        'email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.create({
      data: {
        ...data,
        password: '',
      },
    });
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@infra/config/PrismaService';
import { AuthDTO } from '@interfaces/auth.dto';
import { isMatch } from '@utils/hash';

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !isMatch(password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        name: user.name,
        role: user.role,
      }),
    };
  }
}

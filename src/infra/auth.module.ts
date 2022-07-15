import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '@infra/config/PrismaService';
import { AuthenticateService } from '@usecases/auth/authenticate/authenticate.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './config/JwtConstants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthenticateService, LocalStrategy, PrismaService, JwtStrategy],
  exports: [AuthenticateService],
})
export class AuthModule {}

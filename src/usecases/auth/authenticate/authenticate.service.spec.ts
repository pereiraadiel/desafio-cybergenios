import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {
  let service: AuthenticateService;
  let prisma: PrismaService;
  const mock = {
    id: '7ad6e84a-98a3-4b2e-916d-962688f55646',
    address: 'rua teste',
    cpf: '1232312',
    email: 'test@test.com',
    password: '$2y$10$vfknSYpnA2T52UFOua5sFONesek/CO2JwmpLvTAS227NjN.H2Z4ne',
    name: 'test',
    phone: '34123123123',
    role: 'customer',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticateService, PrismaService, JwtService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mock);

    service = module.get<AuthenticateService>(AuthenticateService);
  });

  it('should not be able to authenticate user with wrong email', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(
      service.execute({
        email: mock.email,
        password: 'test',
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});

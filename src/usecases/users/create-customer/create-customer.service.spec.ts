import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { CreateCustomerService } from './create-customer.service';

describe('CreateCustomerService', () => {
  let service: CreateCustomerService;
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
      providers: [CreateCustomerService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);
    prisma.user.create = jest.fn().mockReturnValueOnce({
      ...mock,
      role: 'customer',
    });

    service = module.get<CreateCustomerService>(CreateCustomerService);
  });

  it('should be able to create user', async () => {
    const user = await service.execute({
      ...mock,
      password: 'test123',
      role: 'customer',
    });
    expect(user.password).toContain('$2y$10$');
    expect(user.id).toBeDefined();
  });
  it('should not be able to create user with already in use cpf or email', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mock);
    await expect(
      service.execute({
        ...mock,
        password: 'test123',
        role: 'customer',
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});

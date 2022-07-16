import { HttpException } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';
import { Test, TestingModule } from '@nestjs/testing';
import { GetCustomerService } from './get-customer.service';

describe('GetCustomerService', () => {
  let service: GetCustomerService;
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
      providers: [GetCustomerService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mock);

    service = module.get<GetCustomerService>(GetCustomerService);
  });

  it('should be able to get user', async () => {
    const user = await service.execute(mock.id);
    expect(user).toMatchObject(mock);
  });
  it('should not be able to get user that does not exists', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(service.execute(mock.id)).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});

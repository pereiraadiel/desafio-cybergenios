import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { UpdateCustomerService } from './update-customer.service';

describe('UpdateCustomerService', () => {
  let service: UpdateCustomerService;
  let prisma: PrismaService;
  const mock = {
    id: '7ad6e84a-98a3-4b2e-916d-962688f55646',
    address: 'rua teste',
    cpf: '1232312',
    email: 'test@test.com',
    password: '$2y$10$vfknSYpnA2T52UFOua5sFONesek/CO2JwmpLvTAS227NjN.H2Z4ne',
    name: 'test',
    phone: '34123123123',
    role: 'admin',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCustomerService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mock);
    prisma.user.update = jest.fn().mockReturnValueOnce({
      ...mock,
      name: 'name',
      role: 'customer',
    });

    service = module.get<UpdateCustomerService>(UpdateCustomerService);
  });

  it('should be able to update user info', async () => {
    const user = await service.execute(mock.id, { name: 'name' });
    expect(user.name).toBe('name');
  });
  it('should not be able to update user info if user does not exists', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(service.execute(mock.id, { name: '' })).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});

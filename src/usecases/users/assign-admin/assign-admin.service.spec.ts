import { HttpException } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';
import { Test, TestingModule } from '@nestjs/testing';
import { AssignAdminService } from './assign-admin.service';

describe('AssignAdminService', () => {
  let service: AssignAdminService;
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
      providers: [AssignAdminService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(mock);
    prisma.user.update = jest.fn().mockReturnValueOnce({
      ...mock,
      role: 'admin',
    });

    service = module.get<AssignAdminService>(AssignAdminService);
  });

  it('should not be able to assign admin role if user does not exist', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(service.execute(mock.id)).rejects.toBeInstanceOf(
      HttpException,
    );
  });

  it('should be able to assign admin role', async () => {
    const user = await service.execute(mock.id);
    expect(user.role).toBe('admin');
  });
});

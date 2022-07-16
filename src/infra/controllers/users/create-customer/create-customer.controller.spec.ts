import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerService } from '@usecases/users/create-customer/create-customer.service';
import { PrismaService } from '@infra/config/PrismaService';
import { CreateCustomerController } from './create-customer.controller';

describe('CreateCustomerController', () => {
  let controller: CreateCustomerController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCustomerController],
      providers: [PrismaService, CreateCustomerService],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);
    prisma.user.create = jest.fn().mockReturnValueOnce({
      id: '7ad6e84a-98a3-4b2e-916d-962688f55646',
      address: 'rua teste',
      cpf: '1232312',
      email: 'test@test.com',
      password: '$2y$10$vfknSYpnA2T52UFOua5sFONesek/CO2JwmpLvTAS227NjN.H2Z4ne',
      name: 'test',
      phone: '34123123123',
      role: 'customer',
    });

    controller = module.get<CreateCustomerController>(CreateCustomerController);
  });

  it('should returns user with password hash', async () => {
    const user = await controller.handle({
      address: 'rua teste',
      cpf: '1232312',
      email: 'test@test.com',
      password: 'test123',
      name: 'test',
      phone: '34123123123',
      role: 'customer',
    });
    expect(user.password).toContain('$2y$10$');
    expect(user.id).toBeDefined();
  });
});

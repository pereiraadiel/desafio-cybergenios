import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { CreateCarService } from './create-car.service';

describe('CreateCarService', () => {
  let service: CreateCarService;
  let prisma: PrismaService;
  const mock = {
    id: '7ad6e84a-98a3-4b2e-916d-962688f55646',
    name: 'Golf',
    model: 'GTI',
    brand: 'VolksWagen',
    year: '2014',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCarService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(null);
    prisma.car.create = jest.fn().mockReturnValueOnce(mock);

    service = module.get<CreateCarService>(CreateCarService);
  });

  it('should be able to create car', async () => {
    const car = await service.execute(mock);
    expect(car).toMatchObject(mock);
  });
});

import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { UpdateCarService } from './update-car.service';

describe('UpdateCarService', () => {
  let service: UpdateCarService;
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
      providers: [UpdateCarService, PrismaService],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(mock);
    prisma.car.update = jest.fn().mockReturnValueOnce({
      ...mock,
      name: 'Gol',
    });

    service = module.get<UpdateCarService>(UpdateCarService);
  });

  it('should be able to update car', async () => {
    const car = await service.execute(mock.id, { name: 'Gol' });
    expect(car.name).toBe('Gol');
  });

  it('should not be able to update car that does not exists', async () => {
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(
      service.execute(mock.id, { name: 'Gol' }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { IndexCarsService } from './index-cars.service';

describe('IndexCarsService', () => {
  let service: IndexCarsService;
  let prisma: PrismaService;
  const mock = [
    {
      id: '7ad6e84a-98a3-4b2e-916d-962688f55646',
      name: 'Golf',
      model: 'GTI',
      brand: 'VolksWagen',
      year: '2014',
    },
    {
      id: 'daa5f256-110e-44ce-9dd1-ec94f294c54a',
      name: 'Saveiro',
      model: 'Surf',
      brand: 'VolksWagen',
      year: '2009',
    },
    {
      id: '3c3c6440-fa10-40a0-a61f-10a3673c48ed',
      name: 'Camaro',
      model: 'ZL1',
      brand: 'Chevrolet',
      year: '2021',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexCarsService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.car.findMany = jest.fn().mockReturnValueOnce(mock);

    service = module.get<IndexCarsService>(IndexCarsService);
  });

  it('should be able to get all cars', async () => {
    const cars = await service.execute({});
    expect(cars.length).toBe(3);
  });

  it('should be able to get all cars paginated', async () => {
    prisma.car.findMany = jest.fn().mockReturnValueOnce([mock[0]]);
    const cars = await service.execute({
      page: 0,
      take: 1,
    });
    expect(cars.length).toBe(1);
    expect(cars[0]).toBe(mock[0]);
  });

  it('should be able to get all cars with brand "VolksWagen"', async () => {
    prisma.car.findMany = jest.fn().mockReturnValueOnce([mock[0], mock[1]]);
    const cars = await service.execute({
      brand: 'VolksWagen',
    });
    expect(cars.length).toBe(2);
  });

  it('should be able to get all cars with brand "VolksWagen" paginated', async () => {
    prisma.car.findMany = jest.fn().mockReturnValueOnce([mock[0]]);
    const cars = await service.execute({
      page: 0,
      take: 1,
      brand: 'VolksWagen',
    });
    expect(cars.length).toBe(1);
    expect(cars[0]).toBe(mock[0]);
  });

  it('should be able to get all cars with name "Camaro" paginated', async () => {
    prisma.car.findMany = jest.fn().mockReturnValueOnce([mock[2]]);
    const cars = await service.execute({
      page: 0,
      take: 1,
      name: 'Camaro',
    });
    expect(cars.length).toBe(1);
    expect(cars[0]).toBe(mock[2]);
  });
});

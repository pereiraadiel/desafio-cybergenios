import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/config/PrismaService';
import { GetCarService } from './get-car.service';

describe('GetCarService', () => {
  let service: GetCarService;
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
      providers: [GetCarService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(mock);

    service = module.get<GetCarService>(GetCarService);
  });

  it('should be able to get car', async () => {
    const car = await service.execute(mock.id);
    expect(car).toMatchObject(mock);
  });

  it('should not be able to get car thats does not exist', async () => {
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(service.execute(mock.id)).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});

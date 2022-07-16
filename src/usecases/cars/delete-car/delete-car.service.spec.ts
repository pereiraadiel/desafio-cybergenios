import { HttpException } from '@nestjs/common';
import { PrismaService } from '@infra/config/PrismaService';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCarService } from './delete-car.service';

describe('DeleteCarService', () => {
  let service: DeleteCarService;
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
      providers: [DeleteCarService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(mock);
    prisma.car.delete = jest.fn().mockReturnValueOnce(mock);

    service = module.get<DeleteCarService>(DeleteCarService);
  });

  it('should be able to delete car', async () => {
    await service.execute(mock.id);
    expect(prisma.car.delete).toBeCalled();
  });
  it('should not be able to delete car that does not exists', async () => {
    prisma.car.findUnique = jest.fn().mockReturnValueOnce(null);
    await expect(service.execute(mock.id)).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});

import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@infra/app.module';
import { PrismaService } from '@infra/config/PrismaService';
import { CarDTO } from '@interfaces/car.dto';

describe('update-car (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
  let cars: CarDTO[];
  const prisma = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'admin@cybergenios.com.br', password: 'cybergenios' })
      .then((response) => {
        accessToken = response.body.accessToken;
      });
    await request(app.getHttpServer())
      .get('/cars')
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        cars = response.body;
      });
  });

  it('/cars/:id (PATCH) should be able to update car', () => {
    return request(app.getHttpServer())
      .patch(`/cars/${cars[0].id}`)
      .send({ name: 'Gol' })
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.body.name).toBe('Gol');
      });
  });

  it('/cars/:id (PATCH) should not be able to update car without authentication', () => {
    return request(app.getHttpServer())
      .patch(`/cars/${cars[0].id}`)
      .send({ name: 'Gol' })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/cars/:id (PATCH) should not be able to update car if user does not have admin role', async () => {
    const authToken = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'admin@cybergenios.com.br', password: 'cybergenios' })
      .then((response) => {
        accessToken = response.body.accessToken;
      });
    return request(app.getHttpServer())
      .patch(`/cars/${cars[0].id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ name: 'Gol' })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  afterAll(async () => {
    await app.close();
    prisma.$disconnect();
  });
});

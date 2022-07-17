import { AppModule } from '@infra/app.module';
import { PrismaService } from '@infra/config/PrismaService';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('create-car (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
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
  });

  it('/cars (POST) should not be able to create car without authentication', () => {
    return request(app.getHttpServer())
      .post('/cars')
      .send({ name: 'Golf', brand: 'VolksWagen', model: 'GTI', year: '2014' })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/cars (POST) should be able to create car if user have admin role', () => {
    return request(app.getHttpServer())
      .post('/cars')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Golf', brand: 'VolksWagen', model: 'GTI', year: '2014' })
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  it('/cars (POST) should not be able to create car if user does not have admin role', async () => {
    const authToken = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'fulano@cybergenios.com.br', password: 'fulano' })
      .then((response) => {
        return response.body.accessToken;
      });

    return request(app.getHttpServer())
      .post('/cars')
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ name: 'Golf', brand: 'VolksWagen', model: 'GTI', year: '2014' })
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });

  afterAll(async () => {
    await app.close();
    prisma.$disconnect();
  });
});

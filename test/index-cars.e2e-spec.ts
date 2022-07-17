import { AppModule } from '@infra/app.module';
import { PrismaService } from '@infra/config/PrismaService';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('get-car (e2e)', () => {
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

  it('/cars (GET) should not be able to get cars without authentication', () => {
    return request(app.getHttpServer())
      .get('/cars')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/cars (GET) should be able to get cars', () => {
    return request(app.getHttpServer())
      .get('/cars')
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  afterAll(async () => {
    await app.close();
    prisma.$disconnect();
  });
});

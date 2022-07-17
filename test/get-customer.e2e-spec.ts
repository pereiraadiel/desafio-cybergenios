import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@infra/app.module';
import { PrismaService } from '@infra/config/PrismaService';

describe('get-user (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
  const jwt = new JwtService();
  let payload;
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
    payload = jwt.decode(accessToken);
  });

  it('/users/:id (GET) should not be able to get specific user without authentication', () => {
    return request(app.getHttpServer())
      .get(`/users/${payload.id}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/users/:id (GET) should be able to get specific user', () => {
    return request(app.getHttpServer())
      .get(`/users/${payload.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(payload.name);
      });
  });

  afterAll(async () => {
    await app.close();
    prisma.$disconnect();
  });
});

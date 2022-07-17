import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { PrismaService } from '@infra/config/PrismaService';
import { AppModule } from '@infra/app.module';
import { JwtService } from '@nestjs/jwt';

describe('update-user (e2e)', () => {
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

  it('/users/:id (PATCH) should be able to update user', () => {
    return request(app.getHttpServer())
      .patch(`/users/${payload.id}`)
      .send({ name: 'Administrador' })
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.body.name).toBe('Administrador');
      });
  });

  it('/users/:id (PATCH) should not be able to update user without authentication', () => {
    return request(app.getHttpServer())
      .patch(`/users/${payload.id}`)
      .send({ name: 'Administrador' })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/users/:id (PATCH) should not be able to update user if user does not have admin role', async () => {
    const authToken = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'admin@cybergenios.com.br', password: 'cybergenios' })
      .then((response) => {
        accessToken = response.body.accessToken;
      });
    return request(app.getHttpServer())
      .patch(`/users/${payload.id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ name: 'Administrador' })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  afterAll(async () => {
    await app.close();
    prisma.$disconnect();
  });
});

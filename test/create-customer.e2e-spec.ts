import { AppModule } from '@infra/app.module';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('create-customer (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';

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

  it('/users (POST) should not be able to create customer without authentication', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'cyber',
        phone: '3412345678',
        email: 'cyber@genios.com',
        password: 'genios',
        cpf: '12345678',
        address: 'Avenida dos gênios',
      })
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/users (POST) should be able to create customer if user have admin role', () => {
    return request(app.getHttpServer())
      .post('/users')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'cyber',
        phone: '3412345678',
        email: 'cyber@genios.com',
        password: 'genios',
        cpf: '12345678',
        address: 'Avenida dos gênios',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });

  it('/users (POST) should not be able to create customer if user does not have admin role', async () => {
    const authToken = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'fulano@cybergenios.com.br', password: 'fulano' })
      .then((response) => {
        return response.body.accessToken;
      });

    return request(app.getHttpServer())
      .post('/users')
      .set({ Authorization: `Bearer ${authToken}` })
      .send({
        name: 'cyber',
        phone: '3412345678',
        email: 'cyber@genios.com',
        password: 'genios',
        cpf: '12345678',
        address: 'Avenida dos gênios',
      })
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

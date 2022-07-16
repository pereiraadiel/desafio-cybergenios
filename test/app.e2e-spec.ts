import { CarDTO } from '@interfaces/car.dto';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@infra/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
  let cars: CarDTO[];
  const jwt = new JwtService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth (POST) should be able to authenticate user', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'admin@cybergenios.com.br', password: 'cybergenios' })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(jwt.decode(response.body.accessToken)).toHaveProperty('id');
        expect(jwt.decode(response.body.accessToken)).toHaveProperty('name');
        expect(jwt.decode(response.body.accessToken)).toHaveProperty('role');
        accessToken = response.body.accessToken;
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

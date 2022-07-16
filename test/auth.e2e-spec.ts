import { AppModule } from '@infra/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('auth (e2e)', () => {
  let app: INestApplication;
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
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

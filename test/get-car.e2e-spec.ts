import { AppModule } from '@infra/app.module';
import { CarDTO } from '@interfaces/car.dto';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('get-car (e2e)', () => {
  let app: INestApplication;
  let accessToken = '';
  let cars: CarDTO[];

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

  it('/cars/:id (GET) should not be able to get specific car without authentication', () => {
    return request(app.getHttpServer())
      .get(`/cars/${cars[0].id}`)
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('/cars/:id (GET) should be able to get specific car', () => {
    return request(app.getHttpServer())
      .get(`/cars/${cars[0].id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(cars[0].name);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@infra/app.module';
import { CarDTO } from '@interfaces/car.dto';

describe('delete-car (e2e)', () => {
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

  it('should be able to delete car', async () => {
    await request(app.getHttpServer())
      .delete(`/cars/${cars[0].id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('should not be able to delete car that does not exists', async () => {
    await request(app.getHttpServer())
      .delete(`/cars/1`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it('should not be able to delete car if user does not have admin role', async () => {
    let authToken = '';
    await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'fulano@cybergenios.com.br', password: 'fulano' })
      .then((response) => {
        authToken = response.body.accessToken;
      });
    await request(app.getHttpServer())
      .delete(`/cars/${cars[1].id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

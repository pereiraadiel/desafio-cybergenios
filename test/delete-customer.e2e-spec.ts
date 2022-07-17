import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@infra/app.module';

describe('delete-user (e2e)', () => {
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

  it('should be able to delete user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/8c26a64d-1101-4664-9659-850046d983c0`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('should not be able to delete user that does not exists', async () => {
    await request(app.getHttpServer())
      .delete(`/users/1`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  it('should not be able to delete user if user does not have admin role', async () => {
    let authToken = '';
    await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'fulano@cybergenios.com.br', password: 'fulano' })
      .then((response) => {
        authToken = response.body.accessToken;
      });
    await request(app.getHttpServer())
      .delete(`/users/3f7f4479-3d6c-4793-ae48-6ecb6da6c0b3`)
      .set({ Authorization: `Bearer ${authToken}` })
      .then((response) => {
        expect(response.statusCode).toBe(403);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

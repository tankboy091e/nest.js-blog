import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { UserService } from 'src/user/user.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = moduleFixture.get<UserService>(UserService);
    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await userService.deleteAll();
    app.close();
  });

  describe('/auth', () => {
    const email = 'tankboyt0913@gmail.com';
    const password = '1234';
    const username = 'bong';
    let accessToken: string;

    it('should create a user', async () => {
      await request(httpServer)
        .post('/user')
        .send({
          email,
          password,
          username,
        })
        .expect(201);
    });

    it('should not find any user', async () => {
      const res = await request(httpServer)
        .post('/auth/signin')
        .send({
          email: 'anotherf@gmail.com',
          password: 'another',
        })
        .expect(404);

      expect(res.body['access_token']).toBeUndefined();
      expect(res.headers['set-cookie']).toBeUndefined();

      accessToken = res.body['access_token'];
    });

    it('should not issue an access token', async () => {
      const res = await request(httpServer)
        .post('/auth/signin')
        .send({
          email,
          password: 'another',
        })
        .expect(401);

      expect(res.body['access_token']).toBeUndefined();
      expect(res.headers['set-cookie']).toBeUndefined();

      accessToken = res.body['access_token'];
    });

    it('should issue an access token', async () => {
      const res = await request(httpServer)
        .post('/auth/signin')
        .send({
          email,
          password,
        })
        .expect(200);

      expect(res.body['access_token']).toBeDefined();
      expect(res.headers['set-cookie']).toBeDefined();

      accessToken = res.body['access_token'];
    });

    it('should not be authenticated', async () => {
      await request(httpServer).get('/auth/test').expect(401);
    });

    it('should be authenticated', async () => {
      await request(httpServer)
        .get('/auth/test')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should sign out', async () => {
      await request(httpServer)
        .get('/auth/signout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(204);
    });

    it('should not give a new token', async () => {
      await request(httpServer).get('/auth/token').expect(401);
    });
  });
});

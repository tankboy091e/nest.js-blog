import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app/app.module';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User])],
      providers: [],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await service.deleteAll();

    module.close();
  });

  describe('getAll', () => {
    it('should return an empty array', async () => {
      const users = await service.findAll();

      expect(users).toEqual([]);
    });
  });

  describe('deleteAll', () => {
    it('should clear all users', async () => {
      await service.create({
        email: '22@dd.cc',
        password: '123',
        username: 'sample',
      });

      await service.deleteAll();

      const users = await service.findAll();

      expect(users).toEqual([]);
    });
  });

  describe('getOneByEmail', () => {
    it('should return nothing', async () => {
      const user = await service.findOneByEmail('dsad@gmail');
      expect(user).toBeUndefined();
    });
  });

  describe('register', () => {
    const email = 'dd23@gmail.com';
    const password = 'a1234';
    const username = '오진';

    const data = {
      email,
      password,
      username,
    };

    it('should create a user', async () => {
      await service.create(data);

      const user = await service.findOneByEmail(email);

      expect(user).toBeDefined();
      expect(user.username).toEqual(username);
    });

    it('should throw an error by conflict', async () => {
      try {
        await service.create(data);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('Conflict');
      }
    });
  });
});

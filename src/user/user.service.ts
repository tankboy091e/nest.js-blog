import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register_user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly respository: Repository<User>,
  ) {}

  public async findAll() {
    return this.respository.find();
  }

  public async findOne(id: number) {
    return this.respository.findOne(id);
  }

  public async findOneByEmail(email: string) {
    return this.respository.findOne({ where: { email } });
  }

  public async create({ email, password, username }: RegisterUserDto) {
    const previous = await this.findOneByEmail(email);

    if (previous) {
      throw new ConflictException();
    }

    const user = this.respository.create({
      email,
      password: bcrypt.hashSync(password, 10),
      username,
    });

    return this.respository.save(user);
  }

  public async deleteAll() {
    return this.respository.createQueryBuilder().delete().from(User).execute();
  }

  public async saveRefreshToken(token: string, id: number) {
    return this.respository.update(id, {
      refreshToken: bcrypt.hashSync(token, 10),
    });
  }

  public async removeRefreshToken(id: number) {
    return this.respository.update(id, {
      refreshToken: null,
    });
  }
}

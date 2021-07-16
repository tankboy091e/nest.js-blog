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
    private readonly repository: Repository<User>,
  ) {}

  public async findAll() {
    return this.repository.find();
  }

  public async findOne(id: number) {
    return this.repository.findOne(id);
  }

  public async findOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  public async create({ email, password, username }: RegisterUserDto) {
    const previous = await this.findOneByEmail(email);

    if (previous) {
      throw new ConflictException();
    }

    const user = this.repository.create({
      email,
      password: bcrypt.hashSync(password, 10),
      username,
    });

    return this.repository.save(user);
  }

  public async deleteAll() {
    return this.repository.createQueryBuilder().delete().from(User).execute();
  }

  public async saveRefreshToken(token: string, id: number) {
    return this.repository.update(id, {
      refreshToken: bcrypt.hashSync(token, 10),
    });
  }

  public async removeRefreshToken(id: number) {
    return this.repository.update(id, {
      refreshToken: null,
    });
  }
}

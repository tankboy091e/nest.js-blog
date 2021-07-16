import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ValidateUserDto } from './dto/validate_user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import parseJwt from 'src/util/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signout(id: number) {
    await this.userService.removeRefreshToken(id);
  }

  public async validate({ email, password }: ValidateUserDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException();
  }

  public async validateWithRefreshToken(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    const { sub } = parseJwt(token);

    try {
      this.verifyRefreshToken(token);
    } catch {
      this.signout(sub);
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new NotFoundException();
    }

    const result = await bcrypt.compare(token, user.refreshToken);

    if (!result) {
      this.signout(sub);
      throw new UnauthorizedException();
    }

    return user;
  }

  public issueAccessToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    const expiresSecond = this.configService.get('JWT_ACCESS_EXPIRES_IN');

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: `${expiresSecond}s`,
    });

    return {
      accessToken,
      expiresSecond: expiresSecond,
    };
  }

  public issueRefreshToken(user: User) {
    const expiresSecond = this.configService.get('JWT_REFRESH_EXPIRES_IN');
    const payload = {
      sub: user.id,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: `${expiresSecond}s`,
    });

    this.userService.saveRefreshToken(refreshToken, user.id);

    return { refreshToken, expiresSecond };
  }

  public verifyAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
  }

  public verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }
}

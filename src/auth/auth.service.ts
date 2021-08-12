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
import { Secretary } from 'src/secretary/secretary.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly secretary: Secretary,
  ) {
    secretary.setContext('AuthService');
  }

  public async signout(id: number) {
    await this.userService.removeRefreshToken(id);
  }

  public async validate({ email, password }: ValidateUserDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      this.secretary.log('user not found for validation');
      throw new NotFoundException();
    }

    if (await bcrypt.compare(password, user.password)) {
      this.secretary.log('password did not match');
      return user;
    }

    throw new UnauthorizedException();
  }

  public async validateWithRefreshToken(token: string) {
    if (!token) {
      this.secretary.log('token is not defined');
      throw new UnauthorizedException();
    }

    const { sub } = parseJwt(token);

    try {
      this.verifyRefreshToken(token);
    } catch {
      this.secretary.log('invalid refresh token');
      this.signout(sub);
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne(sub);

    if (!user) {
      this.secretary.log('user not found for a refresh token validation');
      throw new NotFoundException();
    }

    const result = await bcrypt.compare(token, user.refreshToken);

    if (!result) {
      this.signout(sub);
      this.secretary.log('password did not match');
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

    this.secretary.log('issued access token');

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

    this.secretary.log('issued refresh token');

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

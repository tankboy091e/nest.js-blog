import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { REFRESH_TOKEN } from 'src/common/constants/token';
import { NoContent } from 'src/common/decorators/no-content.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validate_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Role('user')
  @Get('test')
  @NoContent()
  public async test() {
    return null;
  }

  @Role('user')
  @Get('signout')
  public async signout(@Token('sub') sub: number, @Res() res: Response) {
    await this.service.signout(sub);
    res.clearCookie(REFRESH_TOKEN).status(204).end();
  }

  @Get('token')
  public async issue(@Req() req: Request) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN];

    const user = await this.service.validateWithRefreshToken(refreshToken);

    const { accessToken, expiresSecond } = this.service.issueAccessToken(user);

    return {
      access_token: accessToken,
      expiresIn: expiresSecond * 1000,
    };
  }

  @Post('signin')
  public async signin(@Body() body: ValidateUserDto, @Res() res: Response) {
    const user = await this.service.validate(body);

    const { refreshToken, expiresSecond } =
      this.service.issueRefreshToken(user);

    const { accessToken, expiresSecond: accessTokenExpiresSecond } =
      this.service.issueAccessToken(user);

    res.setHeader('Access-Control-Allow-Headers', 'set-cookie');
    res
      .cookie(REFRESH_TOKEN, refreshToken, {
        maxAge: expiresSecond * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({
        access_token: accessToken,
        expiresIn: accessTokenExpiresSecond * 1000,
      });
  }
}

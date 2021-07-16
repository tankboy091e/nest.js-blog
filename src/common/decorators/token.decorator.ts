import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import parseJwt from 'src/util/jwt';

export const Token = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      return null;
    }

    const bearerRegex = /^Bearer\s+/;

    if (!bearerRegex.test(authorization)) {
      return null;
    }

    const token = authorization.replace(bearerRegex, '');

    const payload = parseJwt(token);

    return data ? payload?.[data] : payload;
  },
);

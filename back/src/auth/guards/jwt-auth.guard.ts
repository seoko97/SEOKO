import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { decryptValue } from '@utils/crypto';
import { jwtConstants } from '../constants';

const setAuth = (context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);
  const ctx = gqlContext.getContext();
  const authCookie = ctx.req.cookies[jwtConstants.header];

  if (authCookie)
    ctx.req.headers.authorization = `Bearer ${decryptValue(authCookie)}`;

  return ctx.req;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: unknown, user: any, info: any) {
    if (err || !user) throw err || new UnauthorizedException(info.message);

    return user;
  }

  getRequest(context: ExecutionContext) {
    return setAuth(context);
  }
}

@Injectable()
export class ExpiredJwtAuthGuard extends AuthGuard('jwt-expired') {
  constructor() {
    super();
  }

  handleRequest(err: unknown, user: any) {
    return user;
  }

  getRequest(context: ExecutionContext) {
    return setAuth(context);
  }
}

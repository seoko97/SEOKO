import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly JWT_HEADER;
  constructor(private readonly configService: ConfigService) {
    super();

    this.JWT_HEADER = configService.get('JWT_HEADER');
  }

  handleRequest(err: unknown, user: any, info: any) {
    if (err || !user) throw err || new UnauthorizedException(info.message);

    return user;
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const authCookie = ctx.req.cookies[this.JWT_HEADER];

    if (authCookie) ctx.req.headers.authorization = `Bearer ${authCookie}`;

    return ctx.req;
  }
}

@Injectable()
export class ExpiredJwtAuthGuard extends AuthGuard('jwt-expired') {
  private readonly JWT_HEADER;
  constructor(private readonly configService: ConfigService) {
    super();

    this.JWT_HEADER = configService.get('JWT_HEADER');
  }
  handleRequest(err: unknown, user: any) {
    return user;
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const authCookie = ctx.req.cookies[this.JWT_HEADER];

    if (authCookie) ctx.req.headers.authorization = `Bearer ${authCookie}`;

    return ctx.req;
  }
}

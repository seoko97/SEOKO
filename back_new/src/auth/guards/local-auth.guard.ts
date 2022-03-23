import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    ctx.req.body = gqlContext.getArgs().input;
    return ctx.req;
  }
}

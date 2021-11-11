import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface TokenUser {
  id: number;
}

export const User = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  return req.user;
});

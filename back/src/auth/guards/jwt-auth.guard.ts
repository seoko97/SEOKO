import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { decryptValue } from "@utils/crypto";
import { jwtContents } from "../contents";

const setAuth = (context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const authCookie = req.cookies[jwtContents.header];

  if (authCookie) req.header.authorization = `Bearer ${decryptValue(authCookie)}`;
  return req;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor() {
    super();
  }

  handleRequest(err: unknown, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    return setAuth(context);
  }
}

@Injectable()
export class ExpriedJwtAuthGuard extends AuthGuard("jwt-expried") {
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

import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    return req;
  }
}

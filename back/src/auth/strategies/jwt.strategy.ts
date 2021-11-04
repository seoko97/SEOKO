import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenUser } from "@/decorators/user.decorator";
import { jwtContents } from "../contents";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtContents.secret,
    });
  }

  validate(payload) {
    return { id: payload.id };
  }
}

@Injectable()
export class ExpriedJwtStrategy extends PassportStrategy(Strategy, "jwt-expried") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtContents.secret,
      ignoreExpiration: true,
    });
  }

  validate(payload: TokenUser) {
    return { id: payload.id };
  }
}

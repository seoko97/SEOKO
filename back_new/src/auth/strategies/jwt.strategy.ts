import { ExtractJwt, Strategy as JStrategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ITokenUser } from '@decorators/user.decorator';
import { jwtConstants } from '../contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(JStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: ITokenUser) {
    return { _id: payload._id };
  }
}

@Injectable()
export class ExpriedJwtStrategy extends PassportStrategy(
  JStrategy,
  'jwt-expried',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: true,
    });
  }

  validate(payload: ITokenUser) {
    return { _id: payload._id };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JStrategy } from 'passport-jwt';

import { ITokenUser } from '@decorators/user.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(JStrategy) {
  constructor(private configService: ConfigService) {
    const JWT_SECRET = configService.get('JWT_SECRET_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(payload: ITokenUser) {
    return { _id: payload._id };
  }
}

@Injectable()
export class ExpiredJwtStrategy extends PassportStrategy(
  JStrategy,
  'jwt-expired',
) {
  constructor(private configService: ConfigService) {
    const JWT_SECRET = configService.get('JWT_SECRET_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: true,
    });
  }

  validate(payload: ITokenUser) {
    return { _id: payload._id };
  }
}

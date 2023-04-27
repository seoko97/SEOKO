import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  ExpiredJwtStrategy,
  JwtStrategy,
} from '@common/strategies/jwt.strategy';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { UserModule } from '@users/user.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ExpiredJwtStrategy,
    AuthResolver,
  ],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "@users/users.module";
import { AuthService } from "./auth.service";
import { jwtContents } from "./contents";
import { LocalStrategy } from "./strategies/local.strategy";
import { ExpriedJwtStrategy, JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtContents.secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ExpriedJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

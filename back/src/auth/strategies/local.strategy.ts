import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy as LStrategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(LStrategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "userId",
      passwordField: "password",
    });
  }

  async validate(userId: string, password: string): Promise<any> {
    const user = await this.authService.validateuser(userId, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

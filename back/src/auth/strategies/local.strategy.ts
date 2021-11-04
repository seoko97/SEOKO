import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "userId",
      passwordField: "password",
    });
  }

  async validate(userId: string, password: string): Promise<any> {
    // const user = await this.authService
  }
}

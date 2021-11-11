import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenUser } from "@decorators/user.decorator";
import { UsersService } from "@users/users.service";
import { encryptValue } from "@utils/crypto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateuser(userId: string, password: string): Promise<any> {
    const user = await this.userService.getByUserId(userId);

    const isCompare = await user?.comparePassword(password);

    if (!user || (user && !isCompare)) return null;

    const result = await this.userService.getById(user.id);

    return result;
  }

  async signin(payload: TokenUser): Promise<string> {
    const accessToken = this.jwtService.sign(payload, { expiresIn: "10m" });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "14d" });

    await this.userService.updateRefreshToken(payload.id, refreshToken);

    return encryptValue(accessToken);
  }

  async verifyRefresh(payload: TokenUser): Promise<boolean> {
    const user = await this.userService.getById(payload.id);
    if (!user) return false;
    return user.verifyRefresh();
  }
}

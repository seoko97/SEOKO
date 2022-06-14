import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenUser } from '@decorators/user.decorator';
import { UserService } from '@users/user.service';
import { encryptValue } from '@utils/crypto';
import { User } from '@users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, password: string): Promise<User | null> {
    const user = await this.userService.getByUserId(userId);

    const isCompare = await user?.comparePassword(password);

    if (!user || (user && !isCompare)) return null;

    const result = await this.userService.getById(user._id);

    return result;
  }

  async signin(payload: ITokenUser) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '14d' });

    await this.userService.updateRefreshToken(payload._id, refreshToken);

    return encryptValue(accessToken);
  }

  async verifyRefresh(payload: ITokenUser) {
    const user = await this.userService.getById(payload._id);
    if (!user) return false;
    return user.verifyRefresh();
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AES, enc } from 'crypto-js';
import { verify } from 'jsonwebtoken';

import { ITokenUser } from '@common/decorators/user.decorator';
import { User } from '@users/user.model';
import { UserService } from '@users/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY: string;
  private readonly SIGNIN_SECRET_KEY: string;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.JWT_SECRET_KEY = configService.get('JWT_SECRET_KEY');
    this.SIGNIN_SECRET_KEY = configService.get('SIGNIN_SECRET_KEY');
  }

  async validateUser(userId: string, password: string): Promise<User | null> {
    const user = await this.userService.getByUserId(userId);

    const isCompare = await this.comparePassword(password, user.password);

    if (!user || (user && !isCompare)) return null;

    const result = await this.userService.getById(user._id);

    return result;
  }

  async signin(payload: ITokenUser) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '14d' });

    await this.userService.updateRefreshToken(payload._id, refreshToken);

    return accessToken;
  }

  async verifyRefresh(payload: ITokenUser) {
    const user = await this.userService.getById(payload._id);

    if (!user || !user.refreshToken) throw new UnauthorizedException();

    try {
      const result = verify(user.refreshToken, this.JWT_SECRET_KEY, {});

      if (!Boolean(result)) throw new UnauthorizedException();

      return Boolean(result);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isCompare = await bcrypt.compare(password, hashedPassword);

    return isCompare;
  }

  encryptValue(value: string) {
    return AES.encrypt(value, this.SIGNIN_SECRET_KEY).toString();
  }

  decryptValue(value: string) {
    return AES.decrypt(value, this.SIGNIN_SECRET_KEY).toString(enc.Utf8);
  }
}

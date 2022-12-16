import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';

import { CoreRes } from '@decorators/coreRes.decorator';
import { ITokenUser, User } from '@decorators/user.decorator';
import { UserService } from '@users/user.service';
import { Response } from 'express';

import { SigninInput, SigninRes } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { ExpiredJwtAuthGuard } from './guards/jwt-auth.guard';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => SigninRes)
  async signin(
    @Args('input') _: SigninInput,
    @User() _user: ITokenUser,
    @Context() { res }: { res: Response },
  ): Promise<SigninRes> {
    const { username } = await this.userService.getById(_user._id);
    const accessToken = await this.authService.signin({ _id: _user._id });
    const JWT_HEADER = this.configService.get('JWT_HEADER');

    res.cookie(JWT_HEADER, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true, username };
  }

  @UseGuards(ExpiredJwtAuthGuard)
  @Mutation(() => CoreRes)
  async refresh(
    @User() _user: ITokenUser,
    @Context() { res }: { res: Response },
  ): Promise<CoreRes> {
    if (!_user) return { ok: false, error: '로그인이 필요합니다' };

    await this.authService.verifyRefresh(_user);

    const accessToken = await this.authService.signin(_user);
    const JWT_HEADER = this.configService.get('JWT_HEADER');

    res.cookie(JWT_HEADER, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true };
  }

  @UseGuards(ExpiredJwtAuthGuard)
  @Mutation(() => CoreRes)
  async signout(
    @User() _user: ITokenUser,
    @Context() { res }: { res: Response },
  ) {
    if (!_user) return { ok: false, error: '로그인이 필요합니다.' };

    const JWT_HEADER = this.configService.get('JWT_HEADER');

    await this.userService.updateRefreshToken(_user._id, null);

    res.clearCookie(JWT_HEADER);

    return { ok: true };
  }
}

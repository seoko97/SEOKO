import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { Response } from 'express';

import { CoreRes } from '@common/decorators/coreRes.decorator';
import { ITokenUser, User } from '@common/decorators/user.decorator';
import { UserService } from '@users/user.service';

import { AuthService } from './auth.service';
import { SigninInput, SigninRes } from './dto/signin.dto';
import { ExpiredJwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';

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
  ) {
    const { username } = await this.userService.getById(_user._id);
    const accessToken = await this.authService.signin({ _id: _user._id });
    const JWT_HEADER = this.configService.get('JWT_HEADER');

    res.cookie(JWT_HEADER, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { username };
  }

  @UseGuards(ExpiredJwtAuthGuard)
  @Mutation(() => CoreRes)
  async refresh(
    @User() _user: ITokenUser,
    @Context() { res }: { res: Response },
  ) {
    await this.authService.verifyRefresh(_user);

    const accessToken = await this.authService.signin(_user);
    const JWT_HEADER = this.configService.get('JWT_HEADER');

    res.cookie(JWT_HEADER, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });
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
  }
}

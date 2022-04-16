import { UseGuards, Res } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { ITokenUser, User } from '@decorators/user.decorator';
import { UserService } from '@users/user.service';
import { Response } from 'express';
import { SigninInput, SigninRes } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { jwtConstants } from './contants';
import { AuthService } from './auth.service';
import { ExpriedJwtAuthGuard } from './guards/jwt-auth.guard';
import { CoreRes } from '@src/decorators/coreRes.decorator';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
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

    res.cookie(jwtConstants.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true, username };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Mutation(() => CoreRes)
  async refresh(
    @User() _user: ITokenUser,
    @Context() { res }: { res: Response },
  ) {
    if (!_user) throw new Error('로그인이 필요합니다.');

    const isVerified = await this.authService.verifyRefresh(_user);

    if (!isVerified) return { ok: false, error: 'expried refresh token' };
    const accessToken = await this.authService.signin(_user);

    res.cookie(jwtConstants.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Mutation(() => CoreRes)
  async signout(
    @User() _user: ITokenUser,
    @Context() { res }: { res: Response },
  ) {
    if (!_user) throw new Error('로그인이 필요합니다.');
    await this.userService.updateRefreshToken(_user._id, null);
    res.clearCookie(jwtConstants.header);

    return { ok: true };
  }
}

import { Controller, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";

import { User as UserModel } from "@users/users.model";
import { UsersService } from "@users/users.service";
import { TokenUser, User } from "@decorators/user.decorator";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ExpriedJwtAuthGuard } from "./guards/jwt-auth.guard";
import { SignInDto } from "./dto/signIn.dto";
import { jwtContents } from "./contents";

// 7일
const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  @HttpCode(200)
  async signin(
    @User() _user: TokenUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInDto> {
    const accessToken = await this.authService.signin({ id: _user.id });
    const { username } = (await this.userService.getById(_user.id)) as UserModel;

    res.cookie(jwtContents.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { pass: true, username };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Post("/refresh")
  async refresh(@User() _user: TokenUser, @Res({ passthrough: true }) res: Response) {
    if (!_user) return { pass: false };

    const isVerifiedToken = await this.authService.verifyRefresh(_user);

    if (!isVerifiedToken) return { pass: false, err: "expried refresh token" };

    const accessToken = await this.authService.signin(_user);

    res.cookie(jwtContents.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { pass: true };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Post("/signout")
  async signout(
    @Req() req: Request,
    @User() _user: TokenUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!_user) return { pass: false };
    await this.userService.updateRefreshToken(_user.id, null);
    req.logout();
    res.clearCookie(jwtContents.header);

    return { pass: true };
  }
}

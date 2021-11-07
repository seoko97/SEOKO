import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { TokenUser, User } from "@decorators/user.decorator";

import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";
import { UserResDto } from "./dto/userResDto.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Promise<UserResDto>
  @Post("/signup")
  async createUser(@Body() data: CreateUserDto): Promise<any> {
    // const result = await this.userService.createUser(data);
    // return result;
    return { pass: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/info")
  async getUserInfo(@User() _user: TokenUser): Promise<UserResDto> {
    if (!_user) return { pass: false, err: "로그인을 해주세요." };

    const user = await this.userService.getById(_user.id);

    if (!user) return { pass: false, err: "존재하지 않습니다." };

    return { pass: true, username: user.username };
  }
}

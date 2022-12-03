import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CoreRes } from '@decorators/coreRes.decorator';
import { ITokenUser, User } from '@decorators/user.decorator';
import { CreateUserInput } from './dto/createUser.dto';
import { GetUserInfoDTO } from './dto/getUserInfo.dto';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => CoreRes)
  async create(@Args('input') input: CreateUserInput) {
    const user = await this.userService.getByUserId(input.userId);

    if (user) throw new Error('이미 존재하는 사용자입니다.');

    return await this.userService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GetUserInfoDTO)
  async getUserInfo(@User() _user: ITokenUser) {
    const user = await this.userService.getById(_user._id);

    if (!user) throw new Error('사용자가 존재하지 않습니다.');

    return { ok: true, username: user.username };
  }
}

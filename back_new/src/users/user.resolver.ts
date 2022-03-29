import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CoreRes } from '@src/decorators/coreRes.decorator';
import { ITokenUser, User } from '@src/decorators/user.decorator';
import { ApolloError } from 'apollo-server-express';
import { CreateUserInput } from './dto/createUser.dto';
import { User as UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => CoreRes)
  async create(@Args('input') input: CreateUserInput) {
    const user = await this.userService.getByUserId(input.userId);

    if (user) throw new Error('이미 존재하는 사용자입니다.');
    console.log(input);

    return await this.userService.create(input);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserModel])
  async getUserInfo(@User() _user: ITokenUser) {
    const { username } = await this.userService.getById(_user._id);

    return { ok: true, username };
  }
}

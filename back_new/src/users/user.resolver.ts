import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async test(): Promise<User[]> {
    const user = await this.userService.test();

    return user;
  }

  @Mutation(() => User)
  async create(@Args('input') input: CreateUserInput) {
    return await this.userService.create(input);
  }
}

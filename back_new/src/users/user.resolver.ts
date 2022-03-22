import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => String)
  async create(@Args('input') input: CreateUserInput) {
    await this.userService.create(input);

    return { ok: true };
  }
}

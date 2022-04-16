import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CoreRes } from '@src/decorators/coreRes.decorator';
import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private postService: CategoryService) {}

  @Query(() => CoreRes)
  async test() {
    return { ok: true };
  }
}

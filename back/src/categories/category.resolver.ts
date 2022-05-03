import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CoreRes } from '@decorators/coreRes.decorator';
import { CategoryService } from './category.service';
import { GetCategoriesRes } from './dto/getCategories.dto';

@Resolver('Category')
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => CoreRes)
  async test() {
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async addCategory() {
    return { ok: true };
  }

  @Query(() => GetCategoriesRes)
  async getCategories() {
    const categories = await this.categoryService.getCategories();

    return { ok: true, categories };
  }
}

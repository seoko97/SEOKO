import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CoreRes } from '@src/decorators/coreRes.decorator';
import { CreatePostInput } from './dto/createPostInput.dto';
import { CreatePostRes } from './dto/createPostRes.dto';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async createPost(@Args('input') input: CreatePostInput): Promise<CoreRes> {
    const post = await this.postService.create(input);

    return { ok: true };
  }

  @Query(() => CoreRes)
  async getPost(): Promise<CoreRes> {
    return { ok: true };
  }
}

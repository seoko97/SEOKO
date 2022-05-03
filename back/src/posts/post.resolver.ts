import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { CoreRes } from '@src/decorators/coreRes.decorator';
import { CreatePostInput } from './dto/createPostInput.dto';
import { GetPostDTO, GetPostInput } from './dto/getPost.dto';
import { GetPostsDTO } from './dto/getPosts.dto';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async addPost(@Args('input') input: CreatePostInput): Promise<CoreRes> {
    await this.postService.create(input);

    return { ok: true };
  }

  @Query(() => GetPostDTO)
  async getPost(@Args('input') input: GetPostInput): Promise<GetPostDTO> {
    const post = await this.postService.getPost(input.id);

    console.log(post);

    return { ok: true, post };
  }

  @Query(() => GetPostsDTO)
  async getPosts(): Promise<GetPostsDTO> {
    const posts = await this.postService.getPosts();
    return { ok: true, posts };
  }
}

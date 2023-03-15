import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CoreRes } from '@decorators/coreRes.decorator';
import { ObjectIdGuard } from '@decorators/guards/ObjectId.guard';
import { CreatePostInput } from './dto/createPostInput.dto';
import { EditPostInput } from './dto/editPostInput.dto';
import { BasePostDTO, GetPostDTO, GetPostInput } from './dto/getPost.dto';
import { GetPostsDTO, GetPostsInput } from './dto/getPosts.dto';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BasePostDTO)
  async addPost(@Args('input') input: CreatePostInput): Promise<BasePostDTO> {
    const post = await this.postService.createPost(input);

    return { ok: true, post };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async deletePost(@Args('input') input: GetPostInput) {
    await this.postService.deletePost(input._id);

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BasePostDTO)
  async editPost(@Args('input') input: EditPostInput): Promise<BasePostDTO> {
    const post = await this.postService.editPost(input);

    return { ok: true, post };
  }

  @UseGuards(ObjectIdGuard)
  @Query(() => GetPostDTO)
  async getPost(@Args('input') input: GetPostInput): Promise<GetPostDTO> {
    const [post, siblingPost] = await Promise.all([
      this.postService.getPost(input._id),
      this.postService.getSiblingPost(input._id),
    ]);

    return { ok: true, post, siblingPost };
  }

  @UseGuards(ObjectIdGuard)
  @Query(() => GetPostsDTO)
  async getPosts(
    @Args('input', { nullable: true }) input: GetPostsInput,
  ): Promise<GetPostsDTO> {
    const posts = input?.text
      ? await this.postService.searchPosts(input)
      : await this.postService.getPosts(input);

    return { ok: true, posts };
  }
}

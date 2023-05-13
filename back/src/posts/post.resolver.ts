import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { ObjectIdGuard } from '@common/guards/ObjectId.guard';

import { CreatePostInput } from './dto/createPostInput.dto';
import { EditPostInput } from './dto/editPostInput.dto';
import {
  BasePostDTO,
  BasePostInput,
  GetPostDTO,
  GetPostInput,
} from './dto/getPost.dto';
import { GetPostsDTO, GetPostsInput } from './dto/getPosts.dto';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BasePostDTO)
  async addPost(@Args('input') input: CreatePostInput) {
    const post = await this.postService.createPost(input);

    return { post };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async deletePost(@Args('input') input: BasePostInput) {
    await this.postService.deletePost(input._id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => BasePostDTO)
  async editPost(@Args('input') input: EditPostInput) {
    const post = await this.postService.editPost(input);

    return { post };
  }

  @UseGuards(ObjectIdGuard)
  @Query(() => GetPostDTO)
  async getPost(@Args('input') input: GetPostInput) {
    const [post, siblingPost] = await Promise.all([
      this.postService.getPost(input.numId),
      this.postService.getSiblingPost(input.numId),
    ]);

    return { post, siblingPost };
  }

  @UseGuards(ObjectIdGuard)
  @Query(() => GetPostsDTO)
  async getPosts(@Args('input', { nullable: true }) input: GetPostsInput) {
    const posts = await this.postService.getPosts(input);

    return { posts };
  }
}

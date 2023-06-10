import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

import { CreatePostArgs } from './dto/createPostInput.dto';
import { EditPostArgs } from './dto/editPostInput.dto';
import { Post, PostDocument, PostModel } from './post.model';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: PostModel) {}

  async createPost(post: CreatePostArgs) {
    return await this.postModel.create(post);
  }

  async deletePost(_id: string) {
    await this.postModel.deleteOne({ _id });
  }

  async updatePost(input: EditPostArgs) {
    const { _id, addTags, deleteTags, ...info } = input;

    await this.postModel.updateOne(
      { _id },
      {
        $set: info,
        $pull: { tags: { $in: deleteTags } },
      },
    );

    await this.postModel.updateOne(
      { _id },
      { $addToSet: { tags: { $each: addTags } } },
    );
  }

  async updateManyByEmptyPosts() {
    await this.postModel.updateMany(
      { 'tags.posts': { $size: 0 } },
      { $pull: { tags: { posts: { $size: 0 } } } },
    );
  }

  async getPostById(_id: string) {
    return this.postModel.findOne({ _id }).populate('tags');
  }

  async getPostByNumId(numId: number) {
    return this.postModel.findOne({ numId }).populate('tags');
  }

  async getSiblingPost(numId: number) {
    return await Promise.all([
      this.postModel
        .findOne({
          numId: { $lt: numId },
          isTemporary: false,
        })
        .sort({ numId: -1 }),
      this.postModel
        .findOne({
          numId: { $gt: numId },
          isTemporary: false,
        })
        .sort({ numId: 1 }),
    ]);
  }

  async getPosts(options: FilterQuery<PostDocument>, limit: number) {
    return this.postModel
      .find(options)
      .sort({ _id: -1 })
      .limit(limit)
      .populate('tags');
  }
}

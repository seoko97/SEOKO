import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument, PostModel } from './post.model';
import { EditPostArgs } from './dto/editPostInput.dto';
import { FilterQuery } from 'mongoose';
import { CreatePostInput } from './dto/createPostInput.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: PostModel) {}

  async createPost(post: Omit<CreatePostInput, 'tags'>) {
    return await this.postModel.create(post);
  }

  async deletePost(_id: string) {
    await this.postModel.deleteOne({ _id });
  }

  async updatePost(input: EditPostArgs) {
    const { _id, addTags, deleteTags, ...info } = input;

    await this.postModel.updateOne(
      { _id },
      { ...info, $pull: { tags: { $in: deleteTags } } },
    );

    await this.postModel.updateOne(
      { _id },
      { $addToSet: { tags: { $each: addTags } } },
    );

    const updatedPost = await this.getPostById(_id);

    return updatedPost;
  }

  async updateManyByEmptyPosts() {
    await this.postModel.updateMany(
      { 'tags.posts': { $size: 0 } },
      { $pull: { tags: { posts: { $size: 0 } } } },
    );
  }

  async getPostById(_id: string) {
    return this.postModel.findById(_id).populate('tags');
  }

  async getSiblingPost(_id: string) {
    return await Promise.all([
      this.postModel
        .findOne({
          _id: { $lt: _id },
          isTemporary: false,
        })
        .sort({ _id: -1 }),
      this.postModel
        .findOne({
          _id: { $gt: _id },
          isTemporary: false,
        })
        .sort({ _id: 1 }),
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

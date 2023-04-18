import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModel } from './post.model';
import { EditPostArgs } from './dto/editPostInput.dto';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private readonly postModel: PostModel) {}

  async createPost(post: Post) {
    return this.postModel.create(post);
  }

  async getPostById(_id: string) {
    return this.postModel.findById(_id).populate('tags');
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

    const updatedPost = await this.postModel.findById(_id).populate('tags');

    return updatedPost;
  }

  async updateManyByEmptyPosts() {
    await this.postModel.updateMany(
      { 'tags.posts': { $size: 0 } },
      { $pull: { tags: { posts: { $size: 0 } } } },
    );
  }
}

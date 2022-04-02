import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostInput } from './dto/createPost.dto';
import { Post, PostModel } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: PostModel) {}

  // 단일 포스트
  async getById(_id: string) {
    return await this.postModel.findById(_id);
  }

  async create(input: CreatePostInput) {
    return await this.postModel.create(input);
  }

  async update(_id: string, input: CreatePostInput) {
    return await this.postModel.updateOne({ _id }, input);
  }

  async delete(_id: string) {
    return await this.postModel.deleteOne({ _id });
  }

  async test() {
    return await this.postModel.find();
  }

  // 복수 포스트
  async getPosts() {
    return await this.postModel.find();
  }
}

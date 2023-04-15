import { Types } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostService } from '@posts/post.service';
import { Tag, TagModel } from './tag.model';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private tagModel: TagModel,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
    private tagRepository: TagRepository,
  ) {}

  async getTags() {
    return await this.tagRepository.getTags();
  }

  async getTag(name: string) {
    return await this.tagRepository.getTag(name);
  }

  async findOrCreate(name: string) {
    return await this.tagModel.findOrCreate(name);
  }

  async updateTag(_id: Types.ObjectId | string, query: any) {
    return await this.tagModel.updateOne({ _id }, query);
  }

  async updateManyByPostId(tags: string[], postId: string) {
    await this.tagRepository.updateManyByPostId(tags, postId);
  }

  async deleteManyByPostId(_id: string) {
    await this.tagRepository.deleteManyByPostId(_id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

import { Tag, TagDocument, TagModel } from './tag.model';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private tagModel: TagModel,
    private tagRepository: TagRepository,
  ) {}

  async getTags() {
    return await this.tagRepository.getTags();
  }

  async getTag(name: string) {
    return await this.tagRepository.getTag(name);
  }

  async updateTag(_id: string, query: FilterQuery<TagDocument>) {
    return await this.tagModel.updateOne({ _id }, query);
  }

  async pushAndReturnTagsByPostId(tagNames: string[], postId: string) {
    const tags = await Promise.all(
      tagNames.map((tagName) => this.tagRepository.findOrCreate(tagName)),
    );

    await this.tagRepository.addPostIdInTags(tags, postId);

    return tags;
  }

  async deletePostIdInTags(tags: string[], postId: string) {
    await this.tagRepository.deletePostIdInTags(tags, postId);

    const afterUpdate = await this.tagRepository.getTagsByTagNames(tags);

    return afterUpdate;
  }

  async deleteManyByPostId(_id: string) {
    await this.tagRepository.deleteManyByPostId(_id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { GET_TAGS_OPTIONS, GET_TAG_OPTIONS } from '@utils/constants';

import { Tag, TagDocument, TagModel } from './tag.model';

@Injectable()
export class TagRepository {
  constructor(@InjectModel(Tag.name) private readonly tagModel: TagModel) {}

  async addPostIdInTags(tags: TagDocument[], postId: string) {
    return await this.tagModel.updateMany(
      { _id: { $in: tags.map((tag) => tag._id) } },
      { $addToSet: { posts: postId } },
    );
  }

  // post가 태그를 추가했을때
  async deletePostIdInTags(tags: string[], postId: string) {
    await this.tagModel
      .updateMany({ name: { $in: tags } }, { $pull: { posts: postId } })
      .exec();

    await this.deleteEmptyTags();
  }

  // post가 태그를 삭제했을때
  async deleteManyByPostId(_id: string) {
    await this.tagModel.updateMany(
      { posts: { $in: _id } },
      { $pull: { posts: _id } },
    );

    await this.deleteEmptyTags();
  }

  async deleteEmptyTags() {
    await this.tagModel.deleteMany({ posts: { $size: 0 } });
  }

  async getTag(name: string) {
    const tag = await this.tagModel
      .aggregate<TagDocument>([{ $match: { name } }, ...GET_TAG_OPTIONS])
      .exec();

    return tag[0];
  }

  async findOrCreate(name: string) {
    const tag = await this.tagModel.findOne({ name });

    if (tag) return tag;

    return await this.tagModel.create({ name });
  }

  async getTags() {
    return await this.tagModel.aggregate<TagDocument>(GET_TAGS_OPTIONS).exec();
  }

  async getTagsByTagNames(tagNames: string[]) {
    return await this.tagModel.find({ name: { $in: tagNames } });
  }
}

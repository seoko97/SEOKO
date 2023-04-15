import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument, TagModel } from './tag.model';
import { GET_TAGS_OPTIONS, GET_TAG_OPTIONS } from '@utils/constants';

@Injectable()
export class TagRepository {
  constructor(@InjectModel(Tag.name) private readonly tagModel: TagModel) {}

  // post가 태그를 추가했을때
  async updateManyByPostId(tags: string[], postId: string) {
    return await this.tagModel
      .updateMany(
        tags.map((tag) => ({ name: tag })),
        {
          $pull: { posts: postId },
        },
      )
      .exec();
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

  async getTags() {
    return await this.tagModel.aggregate<TagDocument>(GET_TAGS_OPTIONS).exec();
  }
}

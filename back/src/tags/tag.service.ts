import { Types } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostService } from '@posts/post.service';
import { Tag, TagModel } from './tag.model';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private tagModel: TagModel,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
  ) {}

  async getTags() {
    const tags = await this.tagModel
      .find()
      .populate('posts')
      .then((_tags) => {
        const filteredTags = _tags.filter((tag) => {
          tag.posts = tag.posts.filter((post) => !post.isTemporary);
          return tag.posts.some((post) => !post.isTemporary);
        });

        return filteredTags;
      });

    tags.sort((a, b) => b.posts.length - a.posts.length);

    return tags;
  }

  async getTag(name: string) {
    return await this.tagModel
      .findOne({ name })
      .populate({
        path: 'posts',
        select: 'isTemporary',
      })
      .then((_tag) => {
        _tag.posts = _tag.posts.filter((post) => !post.isTemporary);
        return _tag;
      });
  }
  async getTagById(_id: Types.ObjectId) {
    return await this.tagModel.findOne({ _id });
  }

  async findOrCreate(name: string) {
    return await this.tagModel.findOrCreate(name);
  }

  async updateTag(_id: Types.ObjectId | string, query: any) {
    return await this.tagModel.updateOne({ _id }, query);
  }

  async delete(_id: string | Types.ObjectId) {
    const tag = await this.tagModel.findOneAndDelete({ _id });

    if (!tag) throw new Error('태그가 존재하지 않습니다.');

    await this.postService.deleteManyByTagId(tag._id);

    return { ok: true };
  }

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
}

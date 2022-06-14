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
    return await this.tagModel.find();
  }

  async searchTags(text: string) {
    const tags = await this.tagModel.find({
      name: {
        $regex: text,
      },
    });

    return tags;
  }
  async getTag(name: string) {
    return await this.tagModel.findOne({ name });
  }

  async findOrCreate(name: string) {
    return await this.tagModel.findOrCreate(name);
  }

  async updateTag(_id: string, query: any) {
    return await this.tagModel.findOneAndUpdate({ _id }, query);
  }

  async delete(_id: string) {
    const tag = await this.tagModel.findOneAndDelete({ _id });

    if (!tag) throw new Error('태그가 존재하지 않습니다.');

    await Promise.all(
      tag.posts.map((postId) => {
        return this.postService.update(postId._id.toString(), {
          $pull: {
            tags: tag._id,
          },
        });
      }),
    );

    return { ok: true };
  }
}

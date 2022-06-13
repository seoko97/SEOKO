import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TagService } from '@tags/tag.service';
import { CreatePostInput } from './dto/createPostInput.dto';
import { Post, PostModel } from './post.model';
import { EditPostInput } from './dto/editPostInput.dto';
import { Tag } from '@tags/tag.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: PostModel,
    @Inject(forwardRef(() => TagService))
    private tagService: TagService,
  ) {}

  // 단일 포스트
  async getById(_id: string) {
    return await this.postModel.findById(_id);
  }

  async create({ tags, ...info }: CreatePostInput) {
    const post = await this.postModel.create({
      ...info,
    });

    if (tags.length) {
      const createdTag = await Promise.all(
        tags.map(async (tagName) => {
          const tag = await this.tagService.findOrCreate(tagName);

          tag.posts.push(post._id);

          await tag.save();

          return tag;
        }),
      );

      if (createdTag.length) post.tags = createdTag;
    }

    await post.save();

    return post;
  }

  async update(_id: string, query: any) {
    return await this.postModel.updateOne({ _id }, query);
  }

  async edit({ _id, addTags, deleteTags, ...info }: EditPostInput) {
    const post = await this.postModel.findOne({ _id }).populate('tags');

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    if (deleteTags.length) {
      await Promise.all(
        post.tags.map((tag) =>
          this.tagService.updateTag(tag._id.toString(), {
            $pull: {
              posts: post._id,
            },
          }),
        ),
      );

      post.tags = (post.tags as Tag[]).filter((tag) => {
        return !deleteTags.includes(tag.name);
      });
    }

    if (addTags.length) {
      const createdTag = (await Promise.all(
        addTags.map(async (tagName) => {
          const tag = await this.tagService.findOrCreate(tagName);

          tag.posts.push(post._id);
          await tag.save();

          return tag;
        }),
      )) as Tag[];

      post.tags.push(...createdTag);
    }

    await post.updateOne({
      $set: info,
    });

    await post.save();

    return { ok: true };
  }

  async delete(_id: string) {
    const post = await this.postModel.findOneAndDelete({ _id });

    await Promise.all(
      post.tags.map((tag) =>
        this.tagService.updateTag(tag.toString(), {
          $pull: {
            posts: post._id,
          },
        }),
      ),
    );

    return { ok: true };
  }

  async getPost(_id: string) {
    const post = await this.postModel.findOne({ _id });
    const siblingPost = await this.getSiblingPost(_id);

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    await post.populate('tags');

    return { post, siblingPost };
  }

  async getSiblingPost(_id: string) {
    const post = await this.postModel.findOne({ _id });

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    const prev = await this.postModel
      .findOne({
        _id: { $lt: _id },
      })
      .sort({ createdAt: -1 });

    const next = await this.postModel
      .findOne({
        _id: { $gt: _id },
      })
      .sort({ createdAt: 1 });

    return { prev, next };
  }

  // 복수 포스트
  async getPosts(lastId: string | undefined) {
    const where = lastId ? { _id: { $lt: lastId } } : {};

    return await this.postModel
      .find(where)
      .limit(10)
      .sort({ _id: -1 })
      .populate('tags');
  }
}

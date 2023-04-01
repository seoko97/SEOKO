import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Types } from 'mongoose';
import { TagService } from '@tags/tag.service';
import { Post, PostDocument, PostModel } from './post.model';
import { CreatePostInput } from './dto/createPostInput.dto';
import { EditPostInput } from './dto/editPostInput.dto';
import { GetPostsInput } from './dto/getPosts.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: PostModel,
    @Inject(forwardRef(() => TagService))
    private tagService: TagService,
  ) {}

  getWhere(lastId: string | undefined): FilterQuery<PostDocument> {
    const where = lastId ? { _id: { $lt: lastId } } : {};

    return where;
  }

  async getById(_id: string) {
    return await this.postModel.findById(_id);
  }

  async createPost({ tags, ...info }: CreatePostInput) {
    const post = await this.postModel.create({ ...info });

    if (!tags.length) {
      await post.save();
      return post;
    }

    const createdTag = await Promise.all(
      tags.map(async (tagName) => {
        const tag = await this.tagService.findOrCreate(tagName);

        tag.posts.push(post._id);

        await tag.save();

        return tag;
      }),
    );

    if (createdTag.length) post.tags = createdTag;

    await post.save();
    await post.populate('tags');

    return post;
  }

  async updatePost(_id: string | Types.ObjectId, query: any) {
    return await this.postModel.updateOne({ _id }, query);
  }

  async editPost({ _id, addTags, deleteTags, ...info }: EditPostInput) {
    const post = await this.postModel.findOne({ _id }).populate('tags');

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    // 삭제된 테그들을 포스트에서 제거/태그에서 포스트 제거/태그가 비어있으면 삭제
    if (deleteTags.length) {
      await Promise.all(
        post.tags.map((tag) => {
          if (!deleteTags.includes(tag.name)) return;

          return this.tagService.updateTag(tag._id, {
            $pull: { posts: post._id },
          });
        }),
      );

      post.tags = post.tags.filter((tag) => {
        return !deleteTags.includes(tag.name);
      });

      await this.tagService.deleteEmptyTags();
    }

    if (addTags.length) {
      const createdTag = await Promise.all(
        addTags.map(async (tagName) => {
          const tag = await this.tagService.findOrCreate(tagName);

          tag.posts.push(post._id);

          await tag.save();

          return tag;
        }),
      );

      post.tags.push(...createdTag);
    }

    for (const key in info) {
      post[key] = info[key];
    }

    await post.save();

    return post;
  }

  async deletePost(_id: string) {
    await this.postModel.deleteOne({ _id });

    await this.tagService.deleteManyByPostId(_id);

    return { ok: true };
  }

  async getPost(_id: string) {
    const post = await this.postModel.findOne({ _id });

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    await post.populate('tags');

    return post;
  }

  async getSiblingPost(_id: string) {
    const post = await this.postModel.findOne({ _id });

    if (!post) throw new BadRequestException('포스트가 존재하지 않습니다.');

    const [prev, next] = await Promise.all([
      this.postModel
        .findOne({
          _id: { $lt: _id },
          isTemporary: false,
        })
        .sort({ createdAt: -1 }),
      this.postModel
        .findOne({
          _id: { $gt: _id },
          isTemporary: false,
        })
        .sort({ createdAt: 1 }),
    ]);

    return { prev, next };
  }

  async getPosts(input: GetPostsInput) {
    const {
      lastId,
      limit = 10,
      tag: tagName,
      isTemporary,
      ...options
    } = input ?? {};

    const where: FilterQuery<PostDocument> = {
      ...options,
      ...this.getWhere(lastId),
      isTemporary: isTemporary ?? false,
    };

    if (tagName) {
      const tag = await this.tagService.getTag(tagName);

      if (!tag) throw new BadRequestException('존재하지 않는 태그입니다.');

      where.tags = {
        $in: tag._id,
      };
    }

    return this.postModel
      .find(where)
      .sort({ _id: -1 })
      .limit(limit)
      .populate('tags');
  }

  async searchPosts(input: GetPostsInput) {
    const { text, lastId } = input;

    if (!text.length) return [];

    const where: FilterQuery<PostDocument> = {
      $and: [
        {
          $or: [{ title: { $regex: text } }, { content: { $regex: text } }],
        },
        this.getWhere(lastId),
      ],
      ...input,
    };

    return this.getPosts(where);
  }

  async deleteManyByTagId(tagId: string) {
    return await this.postModel.updateMany(
      { tags: { $in: tagId } },
      { $pull: { tags: tagId } },
    );
  }
}

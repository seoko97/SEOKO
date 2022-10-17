import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Types } from 'mongoose';
import { Tag } from '@tags/tag.model';
import { TagService } from '@tags/tag.service';
import { CreatePostInput } from './dto/createPostInput.dto';
import { Post, PostDocument, PostModel } from './post.model';
import { EditPostInput } from './dto/editPostInput.dto';
import { SearchPostsInput } from './dto/searchPosts.dto';
import { GetPostsByTagInput, GetPostsInput } from './dto/getPosts.dto';

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

  // 단일 포스트
  async getById(_id: string) {
    return await this.postModel.findById(_id);
  }

  async createPost({ tags, ...info }: CreatePostInput) {
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

  async updatePost(_id: string | Types.ObjectId, query: any) {
    return await this.postModel.updateOne({ _id }, query);
  }

  async editPost({ _id, addTags, deleteTags, ...info }: EditPostInput) {
    const post = await this.postModel.findOne({ _id }).populate('tags');

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    if (deleteTags.length) {
      await Promise.all(
        post.tags.map((tag) =>
          this.tagService.updateTag(tag._id, {
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

  async deletePost(_id: string) {
    const post = await this.postModel.findOneAndDelete({ _id });

    const tags = await Promise.all(
      post.tags.map((tag) =>
        this.tagService.updateTag(tag._id, {
          $pull: {
            posts: post._id,
          },
        }),
      ),
    );

    await Promise.all(
      tags.map((tag) => {
        if (tag.posts?.length) this.tagService.delete(tag._id);
      }),
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
  async getPosts(input: GetPostsInput) {
    const { category, lastId, tag: tagName } = input ?? {};

    const where = this.getWhere(lastId);

    if (category) {
      where.category = category;
    }

    if (tagName) {
      const tag = await this.tagService.getTag(tagName);

      if (!tag) throw new BadRequestException('존재하지 않는 태그입니다.');

      where.tags = {
        $in: tag._id,
      };
    }

    return await this.postModel
      .find(where)
      .sort({ _id: -1 })
      .limit(10)
      .populate('tags');
  }

  async getPostsByTag(input: GetPostsByTagInput) {
    const { lastId, tagName } = input;

    const $tag = tagName ? await this.tagService.getTag(tagName) : null;

    const where: FilterQuery<PostDocument> = {
      ...this.getWhere(lastId),
    };

    if ($tag)
      where.tags = {
        $in: $tag._id,
      };

    const posts = await this.postModel
      .find(where)
      .sort({ _id: -1 })
      .limit(10)
      .populate('tags');

    return posts;
  }

  async searchPosts(input: SearchPostsInput) {
    const { text, lastId } = input;

    if (!text.length) return [];

    const where: FilterQuery<PostDocument> = {
      $and: [
        {
          $or: [{ title: { $regex: text } }, { content: { $regex: text } }],
        },
        this.getWhere(lastId),
      ],
    };

    return await this.postModel
      .find(where)
      .sort({ _id: -1 })
      .limit(10)
      .populate('tags');
  }
}

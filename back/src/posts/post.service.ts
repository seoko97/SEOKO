import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Tag } from '@tags/tag.model';
import { TagService } from '@tags/tag.service';
import { CreatePostInput } from './dto/createPostInput.dto';
import { Post, PostDocument, PostModel } from './post.model';
import { EditPostInput } from './dto/editPostInput.dto';
import { SearchPostsInput } from './dto/searchPosts.dto';
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
    const post = await this.postModel.create({
      ...info,
    });

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
    return post;
  }

  async updatePost(_id: string | Types.ObjectId, query: any) {
    return await this.postModel.updateOne({ _id }, query);
  }

  async editPost({ _id, addTags, deleteTags, ...info }: EditPostInput) {
    const post = await this.postModel.findOne({ _id }).populate('tags');

    if (!post) throw new Error('포스트가 존재하지 않습니다.');

    if (deleteTags.length) {
      const updatedTags = await Promise.all(
        post.tags.map((tag) => {
          if (!deleteTags.includes(tag.name)) return;

          return this.tagService.updateTag(tag._id, {
            $pull: {
              posts: post._id,
            },
          });
        }),
      );

      await Promise.all(
        updatedTags.map((tag) => {
          if (!tag) return;

          if (!tag.posts.length) this.tagService.delete(tag._id);
        }),
      );

      post.tags = post.tags.filter((tag) => {
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
        if (!tag.posts?.length) this.tagService.delete(tag._id);
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

    if (!post) throw new BadRequestException('포스트가 존재하지 않습니다.');

    const siblingPost = [
      this.postModel
        .findOne({
          _id: { $lt: new ObjectId(_id) },
        })
        .sort({ createdAt: -1 }),
      this.postModel
        .findOne({
          _id: { $gt: new ObjectId(_id) },
        })
        .sort({ createdAt: 1 }),
    ];

    const [prev, next] = await Promise.all(siblingPost.map((post) => post));

    return { prev, next };
  }

  async getPosts(input: GetPostsInput) {
    const {
      lastId,
      limit = 10,
      tag: tagName,
      isTemporary = true,
      ...options
    } = input ?? {};

    const where: FilterQuery<PostDocument> = {
      ...options,
      ...this.getWhere(lastId),
      isTemporary,
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

    return this.getPosts(where);
  }
}

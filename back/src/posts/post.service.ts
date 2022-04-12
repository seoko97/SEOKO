import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryService } from '@categories/category.service';
import { TagService } from '@tags/tag.service';
import { CreatePostInput } from './dto/createPostInput.dto';
import { Post, PostModel } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: PostModel,
    @Inject(forwardRef(() => TagService))
    private tagService: TagService,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  // 단일 포스트
  async getById(_id: string) {
    return await this.postModel.findById(_id);
  }

  async create({ tags, category, ...info }: CreatePostInput) {
    const foundCategory = await this.categoryService.addCategory(category);

    const post = await this.postModel.create({
      ...info,
      category: foundCategory._id,
    });

    await this.categoryService.update(foundCategory._id, {
      $push: {
        posts: post._id,
      },
    });

    if (tags) {
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

    console.log(post.category);
    await post.save();

    return post;
  }

  async update(_id: string, query: any) {
    return await this.postModel.updateOne({ _id }, query);
  }

  async delete(_id: string) {
    const post = await this.postModel.findOneAndDelete({ _id });

    await Promise.all(
      post.tags.map((tag) =>
        this.tagService.updateTag(tag, {
          $pull: {
            posts: post._id,
          },
        }),
      ),
    );

    await this.categoryService.update(post.category.toString(), {
      $pull: {
        posts: post._id,
      },
    });

    return { ok: true };
  }

  // 복수 포스트
  async getPosts() {
    return await this.postModel.find();
  }
}

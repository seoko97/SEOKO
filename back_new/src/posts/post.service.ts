import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryService } from '@categories/category.service';
import { TagService } from '@tags/tag.service';
import { CreatePostInput } from './dto/createPost.dto';
import { Post, PostModel } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: PostModel,
    private tagService: TagService,
    private categoryService: CategoryService,
  ) {}

  // 단일 포스트
  async getById(_id: string) {
    return await this.postModel.findById(_id);
  }

  async create(input: CreatePostInput) {
    return await this.postModel.create(input);
  }

  async update(_id: string, query: any) {
    return await this.postModel.updateOne({ _id }, query);
  }

  async delete(_id: string) {
    const deletedPost = await this.postModel.findOneAndDelete({ _id });

    await deletedPost.populate('tags');
    await deletedPost.populate('categories');

    const query = {
      $inc: { postCount: -1 },
    };

    await Promise.all(
      deletedPost.tags.map((tag) =>
        this.tagService.updateTag(tag._id.toString(), query),
      ),
    );

    await this.categoryService.update(deletedPost.category._id, query);

    return deletedPost;
  }

  // 복수 포스트
  async getPosts() {
    return await this.postModel.find();
  }
}

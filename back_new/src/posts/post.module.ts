import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from '@src/categories/category.service';
import { TagService } from '@src/tags/tag.service';
import { Post, PostSchema } from './post.model';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  exports: [PostService, TagService, CategoryService],
  providers: [PostResolver, PostService],
})
export class PostModule {}

import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@src/categories/category.module';
import { TagModule } from '@src/tags/tag.module';
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
    forwardRef(() => TagModule),
    forwardRef(() => CategoryModule),
  ],
  exports: [PostService],
  providers: [PostResolver, PostService],
})
export class PostModule {}

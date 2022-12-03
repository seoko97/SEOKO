import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModule } from '@tags/tag.module';
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
  ],
  exports: [PostService],
  providers: [PostResolver, PostService],
})
export class PostModule {}

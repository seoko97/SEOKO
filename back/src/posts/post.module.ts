import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SequenceModule } from '@src/sequence/sequence.module';
import { TagModule } from '@tags/tag.module';

import { Post, PostSchema } from './post.model';
import { PostRepository } from './post.repository';
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
    TagModule,
    SequenceModule,
  ],
  exports: [PostService],
  providers: [PostResolver, PostService, PostRepository],
})
export class PostModule {}

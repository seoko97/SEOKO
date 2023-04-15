import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from '@posts/post.module';
import { Tag, TagSchema } from './tag.model';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { TagRepository } from './tag.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
    forwardRef(() => PostModule),
  ],
  exports: [TagService],
  providers: [TagResolver, TagService, TagRepository],
})
export class TagModule {}

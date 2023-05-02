import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tag, TagSchema } from './tag.model';
import { TagRepository } from './tag.repository';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
  ],
  exports: [TagService],
  providers: [TagResolver, TagService, TagRepository],
})
export class TagModule {}

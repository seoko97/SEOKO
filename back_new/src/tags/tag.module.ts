import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './tag.model';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';

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
  providers: [TagResolver, TagService],
})
export class TagModule {}

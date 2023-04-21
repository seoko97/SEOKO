import { Field, InputType, OmitType, PickType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

import { TagDocument } from '@tags/tag.model';

import { Post } from '../post.model';

@InputType()
export class EditPostInput extends PickType(Post, [
  'isTemporary',
  'coverImg',
  'title',
  'content',
  'category',
  '_id',
]) {
  @IsArray()
  @Type(() => String)
  @Field(() => [String])
  addTags!: string[];

  @IsArray()
  @Type(() => String)
  @Field(() => [String])
  deleteTags!: string[];
}

export class EditPostArgs extends OmitType(EditPostInput, [
  'addTags',
  'deleteTags',
] as const) {
  addTags!: TagDocument[];
  deleteTags!: TagDocument[];
}

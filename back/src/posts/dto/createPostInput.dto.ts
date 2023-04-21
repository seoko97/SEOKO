import { Field, InputType, PickType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

import { Post } from '../post.model';

@InputType()
export class CreatePostInput extends PickType(Post, [
  'coverImg',
  'title',
  'content',
  'category',
  'isTemporary',
]) {
  @IsArray()
  @Type(() => String)
  @Field(() => [String])
  tags!: string[];
}

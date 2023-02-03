import { Field, InputType, PickType } from '@nestjs/graphql';
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
  @Field(() => [String])
  addTags!: string[];

  @Field(() => [String])
  deleteTags!: string[];
}

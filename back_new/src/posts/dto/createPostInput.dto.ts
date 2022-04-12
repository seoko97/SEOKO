import { Field, InputType, PickType } from '@nestjs/graphql';
import { Post } from '../post.model';

@InputType()
export class CreatePostInput extends PickType(Post, [
  'coverImg',
  'title',
  'content',
]) {
  @Field(() => String)
  category!: string;

  @Field(() => [String])
  tags!: string[];
}

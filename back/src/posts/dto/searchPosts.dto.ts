import { Field, InputType } from '@nestjs/graphql';
import { GetPostsInput } from './getPosts.dto';

@InputType()
export class SearchPostsInput extends GetPostsInput {
  @Field(() => String, { nullable: true })
  text?: string;
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Post } from '../post.model';

@InputType()
export class SearchPostsInput {
  @Field(() => String)
  text: string;
}

@ObjectType()
export class SearchPostsDTO extends CoreRes {
  @Field(() => [Post])
  posts!: Post[];
}

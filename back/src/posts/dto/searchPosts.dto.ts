import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { GetPostsInput } from './getPosts.dto';
import { Post } from '../post.model';

@InputType()
export class SearchPostsInput extends GetPostsInput {
  @Field(() => String)
  text: string;
}

@ObjectType()
export class SearchPostsDTO extends CoreRes {
  @Field(() => [Post])
  posts!: Post[];
}

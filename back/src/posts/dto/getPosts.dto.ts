import { Field, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Post } from '../post.model';

@ObjectType()
export class GetPostsDTO extends CoreRes {
  @Field(() => [Post])
  posts!: Post[];
}

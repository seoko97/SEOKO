import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Post } from '../post.model';

@InputType()
export class GetPostsInput {
  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  lastId?: string;
}

@InputType()
export class GetPostsByTagInput extends GetPostsInput {
  @Field(() => String, { nullable: true })
  tagName?: string;
}

@ObjectType()
export class GetPostsDTO extends CoreRes {
  @Field(() => [Post])
  posts!: Post[];
}

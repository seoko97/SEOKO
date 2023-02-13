import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreRes } from '@decorators/coreRes.decorator';
import { Post } from '../post.model';

@InputType()
export class GetPostsInput {
  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  lastId?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isTemporary?: string;

  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => String, { nullable: true })
  tag?: string;
}

@ObjectType()
export class GetPostsDTO extends CoreRes {
  @Field(() => [Post])
  posts!: Post[];
}

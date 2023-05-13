import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';
import { Post } from '@posts/post.model';

@InputType()
export class GetPostInput extends PickType(Post, ['numId'] as const) {}

@InputType()
export class BasePostInput extends PickType(Post, ['_id'] as const) {}

@ObjectType()
export class BasePostDTO extends CoreRes {
  @Field(() => Post)
  post!: Post;
}

@ObjectType()
class SiblingPost {
  @Field(() => Post, { nullable: true })
  next: Post;

  @Field(() => Post, { nullable: true })
  prev: Post;
}

@ObjectType()
export class GetPostDTO extends BasePostDTO {
  @Field(() => SiblingPost)
  siblingPost!: SiblingPost;
}

import { CoreRes } from '@decorators/coreRes.decorator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Post } from '@posts/post.model';

@InputType()
export class GetPostInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
class SiblingPost {
  @Field(() => Post, { nullable: true })
  next: Post;

  @Field(() => Post, { nullable: true })
  prev: Post;
}

@ObjectType()
export class GetPostDTO extends CoreRes {
  @Field(() => Post)
  post!: Post;

  @Field(() => SiblingPost)
  siblingPost!: SiblingPost;
}

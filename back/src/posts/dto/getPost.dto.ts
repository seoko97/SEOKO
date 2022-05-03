import { CoreRes } from '@decorators/coreRes.decorator';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Post } from '@posts/post.model';

@InputType()
export class GetPostInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class GetPostDTO extends CoreRes {
  @Field(() => Post)
  post!: Post;
}

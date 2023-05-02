import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { Post } from '../post.model';

@ObjectType()
export class CreatePostRes extends CoreRes {
  @Field(() => Post)
  post!: Post;
}

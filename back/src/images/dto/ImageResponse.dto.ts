import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@decorators/coreRes.decorator';

@ObjectType()
export class AddImageRes extends CoreRes {
  @Field(() => String)
  image!: string;
}

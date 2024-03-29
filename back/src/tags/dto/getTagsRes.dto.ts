import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { Tag } from '../tag.model';

@ObjectType()
export class GetTagsRes extends CoreRes {
  @Field(() => [Tag])
  tags!: Tag[];
}

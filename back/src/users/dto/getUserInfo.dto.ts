import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';

@ObjectType()
export class GetUserInfoDTO extends CoreRes {
  @Field(() => String)
  username?: string;
}

import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';
import { User } from '@users/user.model';

@InputType()
export class SigninInput extends PickType(User, ['userId', 'password']) {}

@ObjectType()
export class SigninRes extends CoreRes {
  @Field(() => String)
  username!: string;
}

import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreRes } from '@src/decorators/coreRes.decorator';
import { User } from '@src/users/user.model';

@InputType()
export class SigninInput extends PickType(User, ['userId', 'password']) {}

@ObjectType()
export class SigninRes extends CoreRes {
  @Field(() => String)
  username!: string;
}

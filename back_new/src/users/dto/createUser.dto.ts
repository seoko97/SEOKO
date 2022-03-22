import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../user.model';

@InputType('InputUser')
export class CreateUserInput extends PickType(User, [
  'name',
  'password',
  'userId',
] as const) {}

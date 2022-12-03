import { Field, InputType } from '@nestjs/graphql';
import { AddProjectInput } from './addProjectInput.dto';

@InputType()
export class EditProjectInput extends AddProjectInput {
  @Field(() => String)
  _id: string;
}

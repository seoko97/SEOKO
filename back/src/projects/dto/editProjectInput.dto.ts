import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

import { AddProjectInput } from './addProjectInput.dto';

@InputType()
export class EditProjectInput extends AddProjectInput {
  @IsMongoId()
  @Field(() => String)
  _id: string;
}

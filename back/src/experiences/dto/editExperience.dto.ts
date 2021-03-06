import { Field, InputType } from '@nestjs/graphql';
import { AddExperienceInput } from './Experience.dto';

@InputType()
export class EditExperienceInput extends AddExperienceInput {
  @Field(() => String)
  _id: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

import { AddExperienceInput } from './experience.dto';

@InputType()
export class EditExperienceInput extends AddExperienceInput {
  @IsMongoId()
  @Field(() => String)
  _id: string;
}

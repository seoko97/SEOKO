import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

import { AddSkillInput } from './addSkill.dto';

@InputType()
export class EditSkillInput extends AddSkillInput {
  @IsMongoId()
  @Field(() => String)
  _id: string;
}

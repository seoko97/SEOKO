import { Field, InputType } from '@nestjs/graphql';
import { AddSkillInput } from './addSkill.dto';

@InputType()
export class EditSkillInput extends AddSkillInput {
  @Field(() => String)
  _id: string;
}

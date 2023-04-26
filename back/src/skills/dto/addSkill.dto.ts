import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { Skill } from '../skills.model';

@InputType()
export class AddSkillInput extends PickType(Skill, ['name', 'type', 'icon']) {}

@ObjectType()
export class AddSkillDto extends CoreRes {
  @Field(() => Skill)
  skill: Skill;
}

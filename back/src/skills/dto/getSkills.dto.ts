import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { Skill, SkillType } from '../skills.model';

type IGroupedSkills = {
  [key in SkillType]: Skill[];
};

@ObjectType()
export class GroupedSkills implements IGroupedSkills {
  @Field(() => [Skill])
  FRONT_END!: Skill[];

  @Field(() => [Skill])
  BACK_END!: Skill[];

  @Field(() => [Skill])
  DEV_OPS!: Skill[];
}

@ObjectType()
export class GetSkillsDto extends CoreRes {
  @Field(() => GroupedSkills)
  skills!: GroupedSkills;
}

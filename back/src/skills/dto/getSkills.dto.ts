import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';

import { Skill } from '../skills.model';

@ObjectType()
export class GroupedSkills {
  @Field(() => [Skill])
  front!: Skill[];

  @Field(() => [Skill])
  back!: Skill[];

  @Field(() => [Skill])
  devops!: Skill[];
}

@ObjectType()
export class GetSkillsDto extends CoreRes {
  @Field(() => GroupedSkills)
  skills!: GroupedSkills;
}

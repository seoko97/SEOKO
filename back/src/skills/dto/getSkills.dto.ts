import { CoreRes } from '@decorators/coreRes.decorator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Skill } from '../skills.model';

@ObjectType()
export class GetSkillsDto extends CoreRes {
  @Field(() => [Skill])
  skills!: Skill[];
}

import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreRes } from '@decorators/coreRes.decorator';
import { Experience } from '@experiences/experiences.model';

@InputType()
export class AddExperienceInput extends PickType(Experience, [
  'description',
  'endDate',
  'startDate',
  'title',
]) {}

@ObjectType()
export class ExperienceDto extends CoreRes {
  @Field(() => Experience)
  experience!: Experience;
}

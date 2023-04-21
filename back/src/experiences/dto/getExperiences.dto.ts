import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@decorators/coreRes.decorator';
import { Experience } from '@experiences/experiences.model';

@ObjectType()
export class GetExperiencesDto extends CoreRes {
  @Field(() => [Experience])
  experiences!: Experience[];
}

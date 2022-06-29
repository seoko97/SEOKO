import { CoreRes } from '@decorators/coreRes.decorator';
import { Experience } from '@experiences/experiences.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetExperiencesDto extends CoreRes {
  @Field(() => [Experience])
  experiences!: Experience[];
}

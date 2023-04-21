import { Field, ObjectType } from '@nestjs/graphql';

import { CoreRes } from '@decorators/coreRes.decorator';
import { Project } from '@projects/project.model';

@ObjectType()
export class GetProjectDto extends CoreRes {
  @Field(() => Project)
  project!: Project;
}

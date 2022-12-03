import { CoreRes } from '@decorators/coreRes.decorator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from '@projects/project.model';

@ObjectType()
export class GetProjectDto extends CoreRes {
  @Field(() => Project)
  project!: Project;
}

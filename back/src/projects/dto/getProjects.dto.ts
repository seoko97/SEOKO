import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';
import { Project } from '@projects/project.model';

@ObjectType()
export class GetProjectsDto extends CoreRes {
  @Field(() => [Project])
  projects!: Project[];
}

@InputType()
export class GetProjectsInput extends PickType(Project, ['isTemporary']) {}

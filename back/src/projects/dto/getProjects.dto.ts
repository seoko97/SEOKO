import { CoreRes } from '@decorators/coreRes.decorator';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Project } from '@projects/project.model';

@ObjectType()
export class GetProjectsDto extends CoreRes {
  @Field(() => [Project])
  projects!: Project[];
}

@InputType()
export class GetProjectsInput extends PickType(Project, ['isTemporary']) {}

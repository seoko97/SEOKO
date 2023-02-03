import { Field, InputType, PickType } from '@nestjs/graphql';
import { Project } from '../project.model';

@InputType()
export class AddProjectInput extends PickType(Project, [
  'title',
  'description',
  'content',
  'coverImg',
  'githubUrl',
  'startDate',
  'endDate',
]) {
  @Field(() => Boolean, { defaultValue: false })
  isTemporary: boolean;
}

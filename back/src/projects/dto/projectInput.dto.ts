import { InputType, PickType } from '@nestjs/graphql';
import { Project } from '../project.model';

@InputType()
export class ProjectInput extends PickType(Project, ['_id']) {}

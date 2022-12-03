import { Experience } from '@experiences/experiences.model';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteExperienceInput extends PickType(Experience, ['_id']) {}

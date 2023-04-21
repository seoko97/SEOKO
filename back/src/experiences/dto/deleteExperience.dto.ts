import { InputType, PickType } from '@nestjs/graphql';

import { Experience } from '@experiences/experiences.model';

@InputType()
export class DeleteExperienceInput extends PickType(Experience, ['_id']) {}

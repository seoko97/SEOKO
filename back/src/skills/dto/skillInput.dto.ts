import { InputType, PickType } from '@nestjs/graphql';

import { Skill } from '../skills.model';

@InputType()
export class SkillInput extends PickType(Skill, ['_id']) {}

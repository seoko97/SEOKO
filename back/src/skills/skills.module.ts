import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './skills.model';
import { SkillResolver } from './skills.resolver';
import { SkillService } from './skills.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Skill.name,
        schema: SkillSchema,
      },
    ]),
  ],
  exports: [SkillService],
  providers: [SkillResolver, SkillService],
})
export class SkillModule {}

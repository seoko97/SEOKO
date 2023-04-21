import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddSkillDto, AddSkillInput } from './dto/addSkill.dto';
import { EditSkillInput } from './dto/editSkillInput.dto';
import { GetSkillsDto } from './dto/getSkills.dto';
import { SkillInput } from './dto/skillInput.dto';
import { SkillService } from './skills.service';

@Resolver('Skill')
export class SkillResolver {
  constructor(private skillService: SkillService) {}

  @Mutation(() => AddSkillDto)
  async addSkill(@Args('input') input: AddSkillInput) {
    const skill = await this.skillService.addSkill(input);

    return { skill };
  }

  @Mutation(() => AddSkillDto)
  async editSkill(@Args('input') input: EditSkillInput) {
    const skill = await this.skillService.editSkill(input);

    return { skill };
  }

  @Mutation(() => AddSkillDto)
  async deleteSkill(@Args('input') input: SkillInput) {
    const skill = await this.skillService.deleteSkill(input._id);

    return { skill };
  }

  @Query(() => GetSkillsDto)
  async getSkills() {
    const skills = await this.skillService.getSkills();

    return { skills };
  }
}

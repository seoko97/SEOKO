import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SkillService } from './skills.service';

import { AddSkillDto, AddSkillInput } from './dto/addSkill.dto';
import { EditSkillInput } from './dto/editSkillInput.dto';
import { SkillInput } from './dto/skillInput.dto';
import { GetSkillsDto } from './dto/getSkills.dto';

@Resolver('Skill')
export class SkillResolver {
  constructor(private skillService: SkillService) {}

  @Mutation(() => AddSkillDto)
  async addSkill(@Args('input') input: AddSkillInput): Promise<AddSkillDto> {
    const skill = await this.skillService.addSkill(input);

    return { ok: true, skill };
  }

  @Mutation(() => AddSkillDto)
  async editSkill(@Args('input') input: EditSkillInput): Promise<AddSkillDto> {
    const skill = await this.skillService.editSkill(input);

    return { ok: true, skill };
  }

  @Mutation(() => AddSkillDto)
  async deleteSkill(@Args('input') input: SkillInput): Promise<AddSkillDto> {
    const skill = await this.skillService.deleteSkill(input._id);

    return { ok: true, skill };
  }

  @Query(() => GetSkillsDto)
  async getSkills(): Promise<GetSkillsDto> {
    const skills = await this.skillService.getSkills();

    return { ok: true, skills };
  }
}

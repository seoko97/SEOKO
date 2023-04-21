import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

import { DeleteExperienceInput } from './dto/deleteExperience.dto';
import { EditExperienceInput } from './dto/editExperience.dto';
import { AddExperienceInput, ExperienceDto } from './dto/experience.dto';
import { GetExperiencesDto } from './dto/getExperiences.dto';
import { ExperienceService } from './experiences.service';

@Resolver()
export class ExperienceResolver {
  constructor(private experienceService: ExperienceService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ExperienceDto)
  async addExperience(
    @Args('input') input: AddExperienceInput,
  ): Promise<ExperienceDto> {
    const experience = await this.experienceService.addExperience(input);

    return { ok: true, experience };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ExperienceDto)
  async editExperience(
    @Args('input') input: EditExperienceInput,
  ): Promise<ExperienceDto> {
    const experience = await this.experienceService.editExperience(input);

    return { ok: true, experience };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ExperienceDto)
  async deleteExperience(
    @Args('input') input: DeleteExperienceInput,
  ): Promise<ExperienceDto> {
    const experience = await this.experienceService.deleteExperience(input._id);

    return { ok: true, experience };
  }

  @Query(() => GetExperiencesDto)
  async getExperiences(): Promise<GetExperiencesDto> {
    const experiences = await this.experienceService.getExperiences();

    return { ok: true, experiences };
  }
}

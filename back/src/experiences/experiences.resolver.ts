import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteExperienceInput } from './dto/deleteExperience.dto';
import { EditExperienceInput } from './dto/editExperience.dto';
import { AddExperienceInput, ExperienceDto } from './dto/Experience.dto';
import { GetExperiencesDto } from './dto/getExperiences.dto';
import { ExperienceService } from './experiences.service';

@Resolver()
export class ExperienceResolver {
  constructor(private experienceService: ExperienceService) {}

  @Mutation(() => ExperienceDto)
  async addExperience(
    @Args('input') input: AddExperienceInput,
  ): Promise<ExperienceDto> {
    const experience = await this.experienceService.addExperience(input);

    return { ok: true, experience };
  }

  @Mutation(() => ExperienceDto)
  async editExperience(
    @Args('input') input: EditExperienceInput,
  ): Promise<ExperienceDto> {
    const experience = await this.experienceService.editExperience(input);

    return { ok: true, experience };
  }

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

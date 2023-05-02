import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CoreRes } from '@common/decorators/coreRes.decorator';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

import { AddProjectInput } from './dto/addProjectInput.dto';
import { EditProjectInput } from './dto/editProjectInput.dto';
import { GetProjectDto } from './dto/getProject.dto';
import { GetProjectsDto, GetProjectsInput } from './dto/getProjects.dto';
import { ProjectInput } from './dto/projectInput.dto';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GetProjectDto)
  async addProject(@Args('input') input: AddProjectInput) {
    const project = await this.projectService.addProject(input);

    return { project };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GetProjectDto)
  async editProject(@Args('input') input: EditProjectInput) {
    const project = await this.projectService.editProject(input);

    return { project };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async deleteProject(@Args('input') input: ProjectInput) {
    await this.projectService.deleteProject(input._id);
  }

  @Query(() => GetProjectDto)
  async getProject(@Args('input') input: string) {
    const project = await this.projectService.getProject(input);

    return { project };
  }

  @Query(() => GetProjectsDto)
  async getProjects(
    @Args('input', { nullable: true }) input?: GetProjectsInput,
  ) {
    const projects = await this.projectService.getProjects(input);

    return { projects };
  }
}

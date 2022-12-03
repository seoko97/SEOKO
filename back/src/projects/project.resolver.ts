import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CoreRes } from '@decorators/coreRes.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddProjectInput } from './dto/addProjectInput.dto';
import { EditProjectInput } from './dto/editProjectInput.dto';
import { GetProjectDto } from './dto/getProject.dto';
import { GetProjectsDto } from './dto/getProjects.dto';
import { ProjectInput } from './dto/projectInput.dto';
import { ProjectService } from './project.service';

@Resolver()
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async addProject(@Args('input') input: AddProjectInput): Promise<CoreRes> {
    await this.projectService.addProject(input);

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async editProject(@Args('input') input: EditProjectInput): Promise<CoreRes> {
    await this.projectService.editProject(input);

    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CoreRes)
  async deleteProject(@Args('input') input: ProjectInput): Promise<CoreRes> {
    await this.projectService.deleteProject(input._id);

    return { ok: true };
  }

  @Query(() => GetProjectDto)
  async getProject(@Args('input') input: string): Promise<GetProjectDto> {
    const project = await this.projectService.getProject(input);

    return { ok: true, project };
  }

  @Query(() => GetProjectsDto)
  async getProjects(): Promise<GetProjectsDto> {
    const projects = await this.projectService.getProjects();

    return { ok: true, projects };
  }
}

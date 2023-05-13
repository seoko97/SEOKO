import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';

import { SequenceRepository } from '@src/sequence/sequence.repository';

import { AddProjectInput } from './dto/addProjectInput.dto';
import { EditProjectInput } from './dto/editProjectInput.dto';
import { Project, ProjectDocument, ProjectModel } from './project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: ProjectModel,
    private readonly sequenceRepository: SequenceRepository,
  ) {}

  async addProject(info: AddProjectInput) {
    return await this.projectModel.create({
      ...info,
      numId: await this.sequenceRepository.getNextSequence('project'),
    });
  }

  async editProject({ _id, ...info }: EditProjectInput) {
    return await this.projectModel.findOneAndUpdate({ _id }, info, {
      new: true,
    });
  }

  async deleteProject(_id: string) {
    return await this.projectModel.deleteOne({ _id });
  }

  async getProject(numId: number) {
    return await this.projectModel.findOne({ numId });
  }

  async getProjects(option: FilterQuery<ProjectDocument> = {}) {
    return await this.projectModel.find(option).sort({ startDate: -1 });
  }
}

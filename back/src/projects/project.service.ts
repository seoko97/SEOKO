import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, FilterQuery } from 'mongoose';
import { AddProjectInput } from './dto/addProjectInput.dto';
import { EditProjectInput } from './dto/editProjectInput.dto';
import { Project, ProjectDocument, ProjectModel } from './project.model';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: ProjectModel) {}

  async addProject(info: AddProjectInput) {
    return await this.projectModel.create(info);
  }

  async editProject({ _id, ...info }: EditProjectInput) {
    return await this.projectModel.findOneAndUpdate({ _id }, info, {
      new: true,
    });
  }

  async deleteProject(_id: string) {
    return await this.projectModel.deleteOne({ _id });
  }

  async getProject(_id: string) {
    return await this.projectModel.findById(_id);
  }

  async getProjects(option: FilterQuery<ProjectDocument> = {}) {
    return await this.projectModel.find(option).sort({ startDate: -1 });
  }
}

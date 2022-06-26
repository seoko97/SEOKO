import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AddProjectInput } from './dto/addProjectInput.dto';
import { EditProjectInput } from './dto/editProjectInput.dto';
import { Project, ProjectModel } from './project.model';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: ProjectModel) {}

  async addProject(info: AddProjectInput) {
    return await this.projectModel.create(info);
  }

  async editProject({ _id, ...info }: EditProjectInput) {
    return await this.projectModel.updateOne({ _id }, info);
  }

  async deleteProject(_id: Types.ObjectId | string) {
    return await this.projectModel.deleteOne({ _id });
  }

  async getProject(_id: Types.ObjectId | string) {
    return await this.projectModel.findById(_id);
  }

  async getProjects() {
    return await this.projectModel.find().sort({ _id: 1 });
  }
}

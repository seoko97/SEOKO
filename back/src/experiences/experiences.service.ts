import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EditExperienceInput } from './dto/editExperience.dto';
import { AddExperienceInput } from './dto/Experience.dto';
import { Experience, ExperienceModel } from './experiences.model';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name) private experienceModel: ExperienceModel,
  ) {}

  async addExperience(info: AddExperienceInput) {
    return await this.experienceModel.create(info);
  }
  async editExperience({ _id, ...info }: EditExperienceInput) {
    return await this.experienceModel.findOneAndUpdate({ _id }, info, {
      new: true,
    });
  }
  async deleteExperience(_id: string | Types.ObjectId) {
    return await this.experienceModel.findOneAndDelete({ _id });
  }
  async getExperiences() {
    return await this.experienceModel.find();
  }
}

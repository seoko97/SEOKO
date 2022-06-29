import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AddSkillInput } from './dto/addSkill.dto';
import { EditSkillInput } from './dto/editSkillInput.dto';
import { Skill, SkillModel } from './skills.model';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: SkillModel) {}

  async addSkill(info: AddSkillInput) {
    return await this.skillModel.create(info);
  }

  async editSkill({ _id, ...info }: EditSkillInput) {
    return await this.skillModel.findOneAndUpdate({ _id }, info, { new: true });
  }

  async getSkills() {
    return await this.skillModel.find();
  }

  async deleteSkill(_id: string | Types.ObjectId) {
    return await this.skillModel.findOneAndDelete({ _id });
  }
}

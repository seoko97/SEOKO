import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AddSkillInput } from './dto/addSkill.dto';
import { EditSkillInput } from './dto/editSkillInput.dto';
import { GroupedSkills } from './dto/getSkills.dto';
import { Skill, SkillModel, SkillType } from './skills.model';

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
    const skills = await this.skillModel.find();

    const groupSkills = skills.reduce(
      (groups, skill) => {
        if (skill.type === SkillType.FRONT_END) groups.front.push(skill);
        else if (skill.type === SkillType.BACK_END) groups.back.push(skill);
        else if (skill.type === SkillType.DEV_OPS) groups.devops.push(skill);

        return groups;
      },
      {
        front: [],
        back: [],
        devops: [],
      } as { [key: string]: Skill[] },
    ) as unknown as GroupedSkills;

    return groupSkills;
  }

  async deleteSkill(_id: string) {
    return await this.skillModel.findOneAndDelete({ _id });
  }
}

import { CoreResponse } from "./core";

enum SkillType {
  FRONT_END = "FRONT_END",
  BACK_END = "BACK_END",
  DEV_OPS = "DEV_OPS",
}

interface ISkillInput {
  _id?: string;
  name: string;
  type: SkillType | null;
  icon: string;
}

interface ISkill extends ISkillInput {
  _id: string;
}

type BaseSkillResult = {
  skill: ISkill;
} & CoreResponse;

interface IAddSkill {
  addSkill: BaseSkillResult;
}

interface IEditSkill {
  editSkill: BaseSkillResult;
}

interface IDeleteSkill {
  deleteSkill: BaseSkillResult;
}

interface IGetSkills {
  getSkills: {
    skills: {
      front: ISkill[];
      back: ISkill[];
      devops: ISkill[];
    };
  } & CoreResponse;
}

export type { IAddSkill, IDeleteSkill, IEditSkill, IGetSkills, ISkill, ISkillInput, SkillType };

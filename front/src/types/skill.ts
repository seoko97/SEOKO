import { CoreResponse } from "./core";

enum SkillType {
  FRONT_END = "FRONT_END",
  BACK_END = "BACK_END",
  DEV_OPS = "DEV_OPS",
}

type SkillKey = "front" | "back" | "devops";

interface ISkillInput {
  _id?: string;
  name: string;
  type: SkillType | null;
  icon: string;
}

interface ISkill extends ISkillInput {
  _id: string;
}

type ISkills = {
  [key in SkillKey]: ISkill[];
};

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
    skills: ISkills;
  } & CoreResponse;
}

export type {
  IAddSkill,
  IDeleteSkill,
  IEditSkill,
  IGetSkills,
  ISkill,
  ISkills,
  ISkillInput,
  SkillType,
};

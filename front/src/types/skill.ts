import { CoreResponse, CoreResult } from "./core";

enum SkillType {
  FRONT_END = "FRONT_END",
  BACK_END = "BACK_END",
  DEV_OPS = "DEV_OPS",
}

interface ISkillInput {
  _id?: string;
  name: string;
  type?: SkillType;
  icon: string;
}

type ISkill = Required<ISkillInput>;

type ISkills = {
  [key in SkillType]: ISkill[];
};

type BaseSkillResult = {
  skill: ISkill;
} & CoreResponse;

type IAddSkill = CoreResult<"addSkill", BaseSkillResult>;
type IEditSkill = CoreResult<"editSkill", BaseSkillResult>;
type IDeleteSkill = CoreResult<"deleteSkill", BaseSkillResult>;
type IGetSkills = CoreResult<
  "getSkills",
  {
    skills: ISkills;
  } & CoreResponse
>;

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

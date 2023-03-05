import { CoreResponse, CoreResult } from "./core";

interface IExperienceInput {
  _id?: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface IExperience extends IExperienceInput {
  _id: string;
}

type BaseExperienceResult = {
  experience: IExperience;
} & CoreResponse;

type IGetExperiences = CoreResult<
  "getExperiences",
  {
    experiences: IExperience[];
  } & CoreResponse
>;
type IEditExperience = CoreResult<"editExperience", BaseExperienceResult>;
type IAddExperience = CoreResult<"addExperience", BaseExperienceResult>;
type IDeleteExperience = CoreResult<"deleteExperience", BaseExperienceResult>;

export type {
  IExperienceInput,
  IExperience,
  IGetExperiences,
  IEditExperience,
  IAddExperience,
  IDeleteExperience,
};

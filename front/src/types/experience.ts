import { CoreResponse } from "./core";

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

interface IGetExperiences {
  getExperiences: {
    experiences: IExperience[];
  } & CoreResponse;
}

type BaseExperienceResult = {
  experience: IExperience;
} & CoreResponse;

interface IEditExperience {
  editExperience: BaseExperienceResult;
}

interface IAddExperience {
  addExperience: BaseExperienceResult;
}

interface IDeleteExperience {
  deleteExperience: BaseExperienceResult;
}

export type {
  IExperienceInput,
  IExperience,
  IGetExperiences,
  IEditExperience,
  IAddExperience,
  IDeleteExperience,
};

import { CoreResponse, CoreResult, CoreVariables } from "./core";

interface IProjectInput {
  _id?: string;
  title: string;
  description: string;
  content: string;
  coverImg: string;
  githubUrl: string;
  startDate: string;
  endDate: string | null;
  isTemporary?: boolean;
}

interface IProject extends IProjectInput {
  _id: string;
  createdAt: string;
  __typename?: string;
}

interface IBaseProjectResponse extends CoreResponse {
  project: IProject;
}

type IDeleteProject = CoreResult<"deleteProject">;
type IGetProject = CoreResult<"getProject", IBaseProjectResponse>;
type IAddProject = CoreResult<"addProject", IBaseProjectResponse>;
type IEditProject = CoreResult<"editProject", IBaseProjectResponse>;
type IGetProjects = CoreResult<
  "getProjects",
  {
    projects: IProject[];
  } & CoreResponse
>;

type IAddProjectVariables = CoreVariables<IProjectInput>;
type IGetProjectVariables = CoreVariables<string>;

export type {
  IAddProject,
  IDeleteProject,
  IGetProject,
  IGetProjects,
  IProject,
  IEditProject,
  IProjectInput,
  IAddProjectVariables,
  IGetProjectVariables,
};

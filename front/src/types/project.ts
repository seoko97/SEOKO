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

type IAddProject = CoreResult<"addProject">;
type IDeleteProject = CoreResult<"deleteProject">;
type IEditProject = CoreResult<"editProject">;
type IGetProject = CoreResult<
  "getProject",
  {
    project: IProject;
  } & CoreResponse
>;
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
  IEditProject,
  IGetProject,
  IGetProjects,
  IProject,
  IProjectInput,
  IAddProjectVariables,
  IGetProjectVariables,
};

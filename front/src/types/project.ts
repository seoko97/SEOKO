import { CoreResponse, CoreResult } from "./core";

interface IProjectInput {
  _id?: string;
  title: string;
  description: string;
  content: string;
  coverImg: string;
  githubUrl: string;
  startDate: string;
  endDate: string | null;
}

interface IProject extends IProjectInput {
  _id: string;
  createdAt: string;
  isTemporary: boolean;
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

export type {
  IAddProject,
  IDeleteProject,
  IEditProject,
  IGetProject,
  IGetProjects,
  IProject,
  IProjectInput,
};

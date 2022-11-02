import { CoreResponse } from "./core";

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
  __typename?: string;
}

interface IAddProject {
  addProject: CoreResponse;
}

interface IDeleteProject {
  deleteProject: CoreResponse;
}

interface IEditProject {
  editProject: CoreResponse;
}

interface IGetProject {
  getProject: {
    project: IProject;
  } & CoreResponse;
}

interface IGetProjects {
  getProjects: {
    projects: IProject[];
  } & CoreResponse;
}

export type {
  IAddProject,
  IDeleteProject,
  IEditProject,
  IGetProject,
  IGetProjects,
  IProject,
  IProjectInput,
};

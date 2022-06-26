import { CoreResponse } from "./core";

export interface IProjectInput {
  _id?: string;
  title: string;
  description: string;
  content: string;
  coverImg: string;
  githubUrl: string;
  startDate: string;
  endDate: string | null;
}

export interface IProject extends IProjectInput {
  _id: string;
  createdAt: string;
}

export interface IAddProject {
  addProject: CoreResponse;
}

export interface IDeleteProject {
  deleteProject: CoreResponse;
}

export interface IEditProject {
  editProject: CoreResponse;
}

export interface IGetProject {
  getProject: {
    project: IProject;
  } & CoreResponse;
}

export interface IGetProjects {
  getProjects: {
    projects: IProject[];
  } & CoreResponse;
}

import { IProject } from "@queries-types/project";

interface IProjectsByDate {
  [key: string]: IProject[];
}

export const getProjectsByDate = (projects: IProject[] | undefined): IProjectsByDate => {
  if (!projects) return {};

  return projects.reduce<IProjectsByDate>((acc, project) => {
    const startYear = new Date(project.startDate).getFullYear();

    if (!acc[startYear]) acc[startYear] = [];

    acc[startYear].push(project);

    return acc;
  }, {});
};

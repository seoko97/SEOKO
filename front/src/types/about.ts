import { IGetExperiences } from "./experience";
import { IGetProjects } from "./project";
import { IGetSkills } from "./skill";

export interface IGetAbout extends IGetExperiences, IGetSkills, IGetProjects {}

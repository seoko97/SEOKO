import React from "react";

import { IProject } from "@queries-types/project";

import ProjectList from "@molecules/ProjectList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

interface IProps {
  projects: IProject[];
}

const AboutProjectSection = ({ projects }: IProps) => {
  return (
    <Section>
      <SectionHeader>Project</SectionHeader>
      <ProjectList projects={projects} />
    </Section>
  );
};

export default AboutProjectSection;

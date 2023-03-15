import React from "react";
import { useQuery } from "@apollo/client";

import { IGetProjects } from "@queries-types/project";

import { GET_PROJECTS } from "@queries/project";

import ProjectList from "@molecules/ProjectList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

const AboutProjectSection = () => {
  const { data } = useQuery<IGetProjects>(GET_PROJECTS, {
    variables: {
      input: { isTemporary: false },
    },
  });

  if (!data) return <></>;

  const { projects } = data.getProjects;
  return (
    <Section>
      <SectionHeader>Project</SectionHeader>
      <ProjectList projects={projects} />
    </Section>
  );
};

export default AboutProjectSection;

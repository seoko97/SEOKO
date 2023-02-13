import React from "react";

import { useQuery } from "@apollo/client";
import { IGetAbout } from "@queries-types/about";
import { GET_ABOUT } from "@queries/about";

import ProjectList from "@molecules/ProjectList";
import SectionHeader from "../SectionHeader";
import { Section } from "../styles";

const AboutProjectSection = () => {
  const { data } = useQuery<IGetAbout>(GET_ABOUT, {
    variables: {
      input: {
        isTemporary: false,
      },
    },
  });

  return (
    <Section>
      <SectionHeader>Project</SectionHeader>
      <ProjectList projects={data?.getProjects.projects ?? []} />
    </Section>
  );
};

export default AboutProjectSection;

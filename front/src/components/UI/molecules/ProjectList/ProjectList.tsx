import styled from "@emotion/styled";
import ProjectCard from "@molecules/ProjectCard";
import { IProject } from "@queries-types/project";
import React from "react";

interface IProps {
  projects: IProject[];
}

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectList = ({ projects }: IProps) => {
  return (
    <Container>
      {projects.map((project) => (
        <ProjectCard project={project} key={project._id} />
      ))}
    </Container>
  );
};

export default ProjectList;

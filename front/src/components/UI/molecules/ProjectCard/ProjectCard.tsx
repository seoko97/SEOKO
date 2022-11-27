import React from "react";
import styled from "@emotion/styled";
import { IProject } from "@queries-types/project";

import Link from "next/link";
import ProjectImg from "./ProjectImg";
import ProjectCaption from "./ProjectCaption";

interface IProps {
  project: IProject;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: rgb(0 0 0 / 20%) 0px 4px 16px 0px;
  }
`;

const ProjectCard = ({ project }: IProps) => {
  return (
    <Link href={`/project/${project._id}`}>
      <Container>
        <ProjectImg src={project.coverImg} />
        <ProjectCaption
          title={project.title}
          description={project.description}
          startDate={project.startDate}
          endDate={project.endDate}
        />
      </Container>
    </Link>
  );
};

export default ProjectCard;

import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Image from "@atoms/Image";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";

import { dateTimeParser } from "@lib/dateTimeParser";
import { IProject } from "@queries-types/project";
import PostNavigation from "@molecules/PostNavigation";
import GItHubIcon from "@icons/GItHubIcon";
import { userInfoVar } from "@store/userInfo";
import { useDeleteProject } from "@hooks/apollo/project/useProjectMutation";

interface IProps {
  project: IProject;
}

const ProjectHeader = ({ project }: IProps) => {
  const { _id, title, coverImg, description, endDate, githubUrl, startDate, isTemporary } = project;
  const router = useRouter();
  const { username } = useReactiveVar(userInfoVar);

  const [deleteProjectMutation] = useDeleteProject(project._id);

  const editProject = useCallback(() => {
    router.push(`/write/project/${_id}`);
  }, [project]);

  const deleteProject = useCallback(() => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deleteProjectMutation();
  }, [project]);

  return (
    <Container>
      <div className="image-container">
        <Image priority alt="project-cover" src={coverImg} />
      </div>
      {isTemporary && <h3>임시저장</h3>}
      <h1>{title}</h1>
      <p className="desc lt">{description}</p>
      <div className="lt">
        <span>{dateTimeParser(startDate)}</span> ~
        <span>{endDate ? dateTimeParser(endDate) : "진행중"}</span>
      </div>
      <a target="_blank" href={githubUrl} rel="noreferrer">
        <GItHubIcon />
      </a>
      {username && <PostNavigation onEdit={editProject} onDelete={deleteProject} />}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  overflow-wrap: anywhere;

  gap: 1em;

  & > .image-container {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};

    & > img {
      aspect-ratio: 150 / 100;
    }
  }

  & > * {
    text-align: center;
    justify-content: center;
  }
  & > h1 {
    font-weight: 700;
    font-size: 1.35rem;
    margin: 0.5rem 0 1rem 0;
  }

  & svg {
    fill: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    transition: 0.2s fill;
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }

  & .lt {
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    font-size: 0.9em;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    & > h1 {
      font-size: 1.3em;
    }
    & > .image-container {
      width: 100%;
    }
  }
`;

export default ProjectHeader;

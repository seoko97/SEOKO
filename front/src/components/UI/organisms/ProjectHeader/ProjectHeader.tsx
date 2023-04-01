import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation, useReactiveVar } from "@apollo/client";

import { dateTimeParser } from "@lib/dateTimeParser";
import { IDeleteProject, IProject } from "@queries-types/project";
import PostNavigation from "@molecules/PostNavigation";
import { DELETE_PROJECT } from "@queries/project";
import GItHubIcon from "@icons/GItHubIcon";
import { userInfoVar } from "@store/userInfo";

interface IProps {
  project: IProject;
}

const ProjectHeader = ({ project }: IProps) => {
  const { _id, title, coverImg, description, endDate, githubUrl, startDate, isTemporary } = project;
  const router = useRouter();
  const { username } = useReactiveVar(userInfoVar);

  const [deleteProjectMutation] = useMutation<IDeleteProject>(DELETE_PROJECT, {
    onCompleted({ deleteProject }) {
      if (deleteProject.ok) router.replace("/project");
    },
  });

  const editProject = useCallback(() => {
    router.push(`/write/project/${_id}`);
  }, [project]);

  const deleteProject = useCallback(() => {
    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deleteProjectMutation({ variables: { input: { _id } } });
  }, [project]);

  return (
    <Container>
      <div className="image-container">
        <Image priority layout="fill" alt="project-cover" src={coverImg} objectFit="cover" />
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
    width: 90%;
    position: relative;
    padding-bottom: 50%;
    align-items: center;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};

    & img {
      position: absolute;
      justify-content: center;
      border-radius: 12px;
    }
  }

  & > * {
    text-align: center;
    justify-content: center;
  }

  & > h1 {
    font-weight: 700;
    font-size: 2em;
    line-height: 1.2;
    overflow-wrap: anywhere;
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
      line-height: 1.6;
      font-size: 1.6em;
    }
    & > .image-container {
      width: 100%;
      padding-bottom: 60%;
    }
  }
`;

export default ProjectHeader;

import React, { useMemo } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";

import { IGetProject } from "@queries-types/project";

import RowFrame from "@frames/RowFrame";
import Markdown from "@organisms/MarkDownViewer";

import { GET_PROJECT } from "@queries/project";
import ProjectHeader from "@organisms/ProjectHeader";
import removeMd from "remove-markdown";

interface IProps {
  projectId: string;
}

const Project = ({ projectId }: IProps) => {
  const { data } = useQuery<IGetProject>(GET_PROJECT, {
    variables: { input: projectId },
  });

  if (!data) return <></>;

  const {
    getProject: { project },
  } = data;

  const projectDescription = useMemo(
    () => removeMd(project?.content, { useImgAltText: false }).slice(0, 200),
    [],
  );

  return (
    <>
      <Head>
        <title>{project.title} :: SEOKO</title>
        <meta name="description" content={`${projectDescription}...`} />
        <meta name="og:title" content={`${project.title} :: SEOKO`} />
        <meta name="og:description" content={`${projectDescription}...`} />
        <meta name="og:image" content={project.coverImg} />
      </Head>
      <Container>
        {data?.getProject && <ProjectHeader project={data.getProject.project} />}
        <Markdown content={project.content} />
      </Container>
    </>
  );
};

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1em 0;
  margin-bottom: 2em;
`;

export default Project;

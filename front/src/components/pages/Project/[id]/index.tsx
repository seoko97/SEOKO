import React, { useMemo } from "react";
import Head from "next/head";
import removeMd from "remove-markdown";
import styled from "@emotion/styled";

import { IGetProject } from "@queries-types/project";

import RowFrame from "@frames/RowFrame";
import Markdown from "@organisms/MarkDownViewer";

import ProjectHeader from "@organisms/ProjectHeader";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "@queries/project";

interface IProps {
  _id: string;
}

const Project = ({ _id }: IProps) => {
  const { data } = useQuery<IGetProject>(GET_PROJECT, {
    variables: { input: _id },
  });

  if (!data) return <></>;

  const { project } = data.getProject;

  const projectDescription = useMemo(
    () => removeMd(project?.content, { useImgAltText: false }).slice(0, 200),
    [],
  );

  return (
    <>
      <Head>
        <title>{project.title} :: SEOKO</title>
        <meta name="description" content={`${projectDescription}...`} />
        <meta property="og:title" content={`${project.title} :: SEOKO`} />
        <meta property="og:description" content={`${projectDescription}...`} />
        <meta property="og:image" content={project.coverImg} />
      </Head>
      <Container>
        <ProjectHeader project={project} />
        <Markdown content={project.content} />
      </Container>
    </>
  );
};

const Container = styled(RowFrame)`
  width: 768px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1em 0;
  margin-bottom: 2em;
`;

export default Project;

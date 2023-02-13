import React, { useMemo } from "react";
import Head from "next/head";
import removeMd from "remove-markdown";
import styled from "@emotion/styled";

import { IProject } from "@queries-types/project";

import RowFrame from "@frames/RowFrame";
import Markdown from "@organisms/MarkDownViewer";

import ProjectHeader from "@organisms/ProjectHeader";
import auth from "@components/hoc/auth";

interface IProps {
  project: IProject;
}

const Project = auth(({ project }: IProps) => {
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
});

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1em 0;
  margin-bottom: 2em;
`;

export default Project;

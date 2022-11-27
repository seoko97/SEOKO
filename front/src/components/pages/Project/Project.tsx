import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "@queries/project/getProjects.queries";
import { IGetProjects } from "@queries-types/project";

import RowFrame from "@frames/RowFrame";
import ProjectList from "@molecules/ProjectList";

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 2em;

  & > h3 {
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const Project = () => {
  const { data } = useQuery<IGetProjects>(GET_PROJECTS);

  if (!data) return <></>;

  return (
    <>
      <Head>
        <title>프로젝트 :: SEOKO</title>
        <meta
          name="description"
          content="개발자 지석호의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다."
        />
        <meta name="og:title" content="프로젝트 :: SEOKO" />
        <meta
          name="og:description"
          content="개발자 지석호의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다."
        />
      </Head>
      <Container>
        <h3>제가 진행한 프로젝트입니다.</h3>
        <ProjectList projects={data?.getProjects.projects} />
      </Container>
    </>
  );
};

export default Project;

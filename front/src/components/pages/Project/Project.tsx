import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "@queries/project/getProjects.queries";
import { IGetProjects } from "@queries-types/project";

import RowFrame from "@frames/RowFrame";
import ProjectList from "@molecules/ProjectList";

import { getProjectsByDate } from "@lib/getProjectsByDate";

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-bottom: 2em;

  & > .page_info {
    padding: 1em 0;

    & > h1 {
      color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 0.3em;
    }

    & > p {
      color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    }
  }

  & .count {
    font-size: 0.8rem;
    vertical-align: top;
    margin-left: 0.5em;
    font-weight: normal;
  }
`;

const ProjectBox = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;

  &:not(:last-child) {
    margin-bottom: 2em;
  }

  & > h2 {
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const Project = () => {
  const { data } = useQuery<IGetProjects>(GET_PROJECTS);
  const projects = getProjectsByDate(data?.getProjects.projects);
  const yearsBtProject = Object.keys(projects).sort((a, b) => (a > b ? -1 : 1));

  if (!data) return <></>;

  return (
    <>
      <Head>
        <title>프로젝트 :: SEOKO</title>
        <meta
          name="description"
          content="개발자 지석호의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다."
        />
        <meta property="og:title" content="프로젝트 :: SEOKO" />
        <meta
          property="og:description"
          content="개발자 지석호의 포트폴리오입니다. 개발을 하며 진행해온 프로젝트들을 기록해놓았습니다."
        />
      </Head>
      <Container>
        <div className="page_info">
          <h1>
            Projects <span className="count">{data.getProjects.projects.length} projects</span>
          </h1>
          <p>연도별로 진행한 프로젝트 목록입니다.</p>
        </div>
        <div>
          {yearsBtProject.map((year) => (
            <ProjectBox key={year}>
              <h2>
                {year} <span className="count">{projects[year].length} projects</span>
              </h2>
              <ProjectList projects={projects[year]} />
            </ProjectBox>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Project;

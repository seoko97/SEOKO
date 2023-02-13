import React from "react";
import styled from "@emotion/styled";

import RowFrame from "@frames/RowFrame";
import ProjectList from "@molecules/ProjectList";
import PostList from "@organisms/PostList";

import { IPost } from "@queries-types/posts";
import { IProject } from "@queries-types/project";

interface IProps {
  posts: IPost[];
  projects: IProject[];
}

const Temporary = ({ posts, projects }: IProps) => {
  return (
    <RowFrame>
      <Section>
        <h1>프로젝트</h1>
        <ProjectList projects={projects} />
      </Section>
      <Section>
        <h1>게시글</h1>
        <PostList posts={posts} />
      </Section>
    </RowFrame>
  );
};

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:first-of-type {
    margin-bottom: 3rem;
  }
`;

export default Temporary;

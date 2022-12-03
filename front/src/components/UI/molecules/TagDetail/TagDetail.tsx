import React from "react";
import styled from "@emotion/styled";

import { useQuery } from "@apollo/client";

import { IGetTag } from "@queries-types/tags";
import { GET_TAG } from "@queries/tag";

interface IProps {
  tagName: string;
}

const TagDetail = ({ tagName }: IProps) => {
  const { data: tagResult } = useQuery<IGetTag>(GET_TAG, {
    variables: {
      input: tagName,
    },
  });

  return (
    <Container>
      <h1>{tagName}</h1>
      <span>{tagResult?.getTag.tag.posts.length ?? 0} posts</span>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;

  display: flex;
  gap: 0.5em;
  padding: 1.2em 1em;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  & > h1 {
    font-size: 1.8em;
    font-weight: 700;
  }

  & > p {
    font-size: 0.8em;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    font-size: 0.8rem;
    padding: 1.2em 0;
  }
`;

export default TagDetail;

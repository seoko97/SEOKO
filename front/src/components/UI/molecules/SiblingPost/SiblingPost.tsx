import styled from "@emotion/styled";
import { ISiblingPost } from "@queries-types/posts";
import React from "react";
import SiblingItem from "./SiblingItem";

interface IProps {
  siblingPost: ISiblingPost;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: column-reverse;
  }
`;

const SiblingPost = ({ siblingPost }: IProps) => {
  const { next, prev } = siblingPost;

  return (
    <Container>
      <SiblingItem type="prev" post={prev} />
      <SiblingItem type="next" post={next} />
    </Container>
  );
};

export default SiblingPost;

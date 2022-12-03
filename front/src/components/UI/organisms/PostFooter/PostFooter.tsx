import React from "react";
import styled from "@emotion/styled";
import SiblingPost from "@molecules/SiblingPost";
import Utterances from "@molecules/Utterances";
import { ISiblingPost } from "@queries-types/posts";

interface IProps {
  siblingPost: ISiblingPost;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 0;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

const PostFooter = ({ siblingPost }: IProps) => {
  return (
    <Container>
      <SiblingPost siblingPost={siblingPost} />
      <Utterances repo="seoko97/SEOKO_utterances" />
    </Container>
  );
};

export default PostFooter;

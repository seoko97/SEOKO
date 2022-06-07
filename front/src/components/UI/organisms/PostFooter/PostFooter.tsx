import React from "react";
import styled from "@emotion/styled";
import SiblingPost from "@molecules/SiblingPost";
import Untterances from "@molecules/Untterances";
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
  border-top: 1px solid #ccc;
  margin-top: 20px;
`;

const PostFooter = ({ siblingPost }: IProps) => {
  return (
    <Container>
      <SiblingPost siblingPost={siblingPost} />
      <Untterances siblingPost={siblingPost} repo="seoko97/SEOKO_utterances" />
    </Container>
  );
};

export default PostFooter;

import React from "react";
import styled from "@emotion/styled";
import { Props as PostProps } from "@states/posts/atoms";
import PostImg from "./PostImg";
import PostContent from "./PostContent";

interface Props {
  post: PostProps;
}

const StyedPostItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 hsla(0, 0%, 0%, 0.1);
  position: relative;

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    width: 100%;
    flex-direction: column;
  }
`;

const PostItem = ({ post }: Props) => {
  return (
    <>
      <StyedPostItem>
        <PostImg titleImage={post.titleImage} />
        <PostContent content={post.content} tags={post.tags} title={post.title} />
      </StyedPostItem>
    </>
  );
};

export default PostItem;

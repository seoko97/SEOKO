import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Props as PostProps } from "@states/posts/atoms";

interface Props {
  post: PostProps;
}

const StyedPostItem = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.SECONDARY_COLOR};
  border-radius: 5px;
  box-shadow: 0 1px 6px 0 hsla(0, 0%, 0%, 0.1);

  & .img_box {
    width: 30%;
    height: 100%;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 5px 0 0 5px;
    }
  }
  & .content_box {
    width: 70%;
    padding: 10px;
  }
`;

const PostItem = ({ post }: Props) => {
  console.log(post);
  return (
    <>
      <StyedPostItem>
        <div className="img_box">
          <img src={post.titleImage} />
        </div>
        <div className="content_box">
          <h1>{post.title}</h1>
          <h1>{post.title}</h1>
          <h1>{post.title}</h1>
        </div>
      </StyedPostItem>
    </>
  );
};

export default PostItem;

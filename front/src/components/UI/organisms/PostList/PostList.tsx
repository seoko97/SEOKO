import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

import { postState } from "@states/posts/atoms";
import { post as postList } from "@src/dummy/posts";
import RowFrame from "@frames/RowFrame";
import PostItem from "@molecules/PostItem";

const StyledPostList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postState);

  useEffect(() => {
    setPosts(postList);
  }, []);

  return (
    <>
      <StyledPostList>
        <RowFrame>
          {posts && posts.map((el) => <PostItem key={el.id + el.title} post={el} />)}
        </RowFrame>
      </StyledPostList>
    </>
  );
};

export default PostList;

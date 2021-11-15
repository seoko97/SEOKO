import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { postState } from "@states/posts/atoms";
import { post as postList } from "@src/dummy/posts";

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postState);

  useEffect(() => {
    setPosts(postList);
  }, []);

  console.log(posts);

  return (
    <>
      <div>asd</div>
    </>
  );
};

export default PostList;

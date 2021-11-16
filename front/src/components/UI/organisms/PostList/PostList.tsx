import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { postState } from "@states/posts/atoms";
import { post as postList } from "@src/dummy/posts";

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postState);

  useEffect(() => {
    setPosts(postList);
  }, []);

  return (
    <>
      <div>{posts && posts.map((el) => <div key={el.id + el.title}>asd</div>)}</div>
    </>
  );
};

export default PostList;

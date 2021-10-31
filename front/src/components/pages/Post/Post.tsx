import React from "react";
import ParallaxForm from "@molecules/ParallaxForm";

const Post = () => {
  return (
    <>
      <ParallaxForm imgSrc="/post.jpg">
        <h2>Post</h2>
        <p>전체 게시글 목록입니다.</p>
      </ParallaxForm>
      <div>Post</div>
    </>
  );
};

export default Post;

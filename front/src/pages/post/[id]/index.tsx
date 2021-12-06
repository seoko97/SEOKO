import { GetServerSideProps } from "next";
import React from "react";

const Post = () => {
  return (
    <>
      <div>asdasd</div>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query);

  return { props: {} };
};

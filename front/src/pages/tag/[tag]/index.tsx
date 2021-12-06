import { GetServerSideProps, NextPage } from "next";
import React from "react";

const Tag: NextPage = () => {
  return (
    <>
      <div>asd</div>
    </>
  );
};

export default Tag;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query);
  return { props: {} };
};

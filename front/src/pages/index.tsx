import { GetServerSideProps } from "next";
import { post as dummyPost } from "@src/dummy/posts";
import { dummyCategory } from "@src/dummy/categories";

export { default } from "@pages/Home";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await dummyPost;
  const categories = await dummyCategory;

  return {
    props: {
      posts,
      categories,
    },
  };
};

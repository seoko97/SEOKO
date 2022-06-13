import React from "react";

import RowFrame from "@frames/RowFrame";
import Intro from "@molecules/Intro";

import PostList from "@organisms/PostList";

const Home = () => {
  return (
    <RowFrame>
      <Intro />
      <PostList />
    </RowFrame>
  );
};

export default Home;

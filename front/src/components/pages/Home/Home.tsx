import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import PageContent from "@molecules/PageContent";
import PostList from "@organisms/PostList";
import RowFrame from "@frames/RowFrame";
import MainCategory from "@src/components/UI/molecules/MainCategory";

import { categoryState } from "@states/categories/atoms";
import { postState, Props as PostProps } from "@states/posts/atoms";

interface Props {
  posts: PostProps[];
  categories: any[];
}
const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  @media (max-width: ${({ theme }) => theme.BP.HDPC}) {
    flex-direction: column-reverse;
  }
`;

const Home = ({ posts, categories }: Props) => {
  const setPosts = useSetRecoilState(postState);
  const setCategories = useSetRecoilState(categoryState);

  useEffect(() => {
    setPosts(posts);
    setCategories(categories);
  }, []);

  return (
    <>
      <PageContent>
        <RowFrame>
          <StyledDiv>
            <PostList />
            <MainCategory />
          </StyledDiv>
        </RowFrame>
      </PageContent>
    </>
  );
};

export default Home;

import React, { useEffect } from "react";
import styled from "@emotion/styled";

import ParallaxForm from "@molecules/ParallaxForm";
import PageContent from "@molecules/PageContent";
import PostList from "@organisms/PostList";
import RowFrame from "@frames/RowFrame";
import Category from "@molecules/Category";

import { postState, Props as PostProps } from "@states/posts/atoms";
import { categoryState, Props as CategoryProps } from "@states/categories/atoms";
import { useSetRecoilState } from "recoil";

interface Props {
  posts: PostProps[];
  categories: CategoryProps[];
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
      <ParallaxForm imgSrc="/main.jpg">
        <h2>Main</h2>
        <p>SEOKO&apos;s blog</p>
      </ParallaxForm>
      <PageContent>
        <RowFrame>
          <StyledDiv>
            <PostList />
            <Category />
          </StyledDiv>
        </RowFrame>
      </PageContent>
    </>
  );
};

export default Home;

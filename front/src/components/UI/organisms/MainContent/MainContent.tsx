import React, { useCallback, useRef } from "react";

import styled from "@emotion/styled";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";

import useInput from "@hooks/useInput";

import PostList from "@organisms/PostList";
import { checkParams } from "@lib/checkParamsType";

import { useGetPosts } from "@hooks/apollo/post/useGetPosts";
import ContentHeader from "./ContentHeader";

const MainContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [text, textHandler] = useInput();

  const { category } = router.query;

  const [posts, fetchMorePosts] = useGetPosts({
    category: checkParams(category),
    text,
  });

  const debouncedChangeHandler = useCallback(debounce(textHandler, 300), []);

  const onChangeCategory = useCallback(
    (category: string) => {
      const query = { ...router.query };

      query.category = category;

      if (category === "all") {
        delete query.category;
      }

      router.push({ query });
    },
    [router],
  );

  return (
    <Container>
      <ContentHeader changeCategory={onChangeCategory} changeText={debouncedChangeHandler} />
      {posts.length > 0 && <PostList ref={ref} posts={posts} func={fetchMorePosts} />}
      {posts.length === 0 && <NoneContent>포스트를 찾을 수 없습니다 🙄</NoneContent>}
    </Container>
  );
};

const Container = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoneContent = styled.p`
  padding: 1em 0;

  text-align: center;
  font-size: 2em;

  color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  font-weight: bold;

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    font-size: 1.3em;
    padding: 3em 0;
  }
`;

export default MainContent;

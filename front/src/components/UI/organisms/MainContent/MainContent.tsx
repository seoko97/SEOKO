import React, { useCallback, useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";
import debounce from "lodash/debounce";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import useInput from "@hooks/useInput";

import { GET_POSTS } from "@queries/post";
import { IGetPosts, IPost } from "@queries-types/posts";

import PostList from "@organisms/PostList";
import ContentHeader from "./ContentHeader";

const MainContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [text, textHandler] = useInput();

  const { category } = router.query;

  const { data, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: {
      input: { category, text },
    },
  });

  const [mainPosts, setMainPosts] = useState<IPost[]>(data?.getPosts.posts ?? []);

  useEffect(() => {
    const fetchedPosts = data?.getPosts.posts;

    if (fetchedPosts) setMainPosts(fetchedPosts);
  }, [data]);

  const debouncedChangeHandler = useCallback(debounce(textHandler, 300), []);

  const fetchMorePosts = useCallback(() => {
    if (!data) return;

    const {
      getPosts: { posts },
    } = data;

    if (posts.length % 10 !== 0) return;

    const input = {
      lastId: posts[posts.length - 1]._id,
      category,
      text,
    };

    fetchMore({
      variables: {
        input,
      },
    });
  }, [ref, data, category, text]);

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
      {mainPosts.length > 0 && <PostList ref={ref} posts={mainPosts} func={fetchMorePosts} />}
      {mainPosts.length === 0 && <NoneContent>포스트를 찾을 수 없습니다 🙄</NoneContent>}
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

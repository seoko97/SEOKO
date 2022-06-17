import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useLazyQuery } from "@apollo/client";
import useInput from "@hooks/useInput";
import useFetchScroll from "@hooks/useFetchScroll";
import useDebounceEffect from "@hooks/useDebounceEffect";

import Input from "@atoms/Input";

import { SEARCH_POSTS } from "@queries/post/searchPosts.queries";
import { ISearchPost, ISearchPosts } from "@queries-types/search";

import SearchPost from "./SearchPost";

const Container = styled.div`
  position: relative;
  z-index: 101;
  border-radius: 12px;
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 980px;
  height: fit-content;

  min-height: 30vh;
  max-height: 60vh;
  box-shadow: 0px 9px 15px -15px #454545;
  margin: 128px 0;
  padding: 40px;

  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};

  & input {
    width: 100%;
    padding: 1rem;
    background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
    border: 1px solid #ccc;
    border-radius: 4px;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    margin: 40px 16px 0 16px;
    width: 100%;
    padding: 20px 16px;

    & input {
      padding: 0.6rem;
    }
  } ;
`;

const SearchByPosts = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [text, onChangeText] = useInput("");
  const [posts, setPosts] = useState<ISearchPost[]>([]);

  const [getSearchPostsQuery, { fetchMore, variables }] = useLazyQuery<ISearchPosts>(SEARCH_POSTS, {
    onCompleted({ searchPosts }) {
      if (searchPosts.ok) setPosts(searchPosts.posts);
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (text.length === 0) setPosts([]);
  }, [text]);

  const fetchMorePosts = useCallback(() => {
    if (posts.length < 10) return;

    const newVariables = { ...variables };
    newVariables.input.lastId = posts[posts.length - 1]._id;

    fetchMore({
      variables: newVariables,
    });
  }, [variables, posts]);

  const getSearchPosts = useCallback(() => {
    if (text.length === 0) return;

    getSearchPostsQuery({
      variables: {
        input: {
          text,
        },
      },
    });
  }, [text]);

  useFetchScroll(ref, fetchMorePosts);
  useDebounceEffect(getSearchPosts, 300);

  return (
    <Container>
      <Input value={text} onChange={onChangeText} placeholder="검색어를 입력하세요" />
      <SearchPost ref={ref} posts={posts} />
    </Container>
  );
};

export default SearchByPosts;

import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useLazyQuery } from "@apollo/client";
import useInput from "@hooks/useInput";
import useFetchScroll from "@hooks/useFetchScroll";
import useDebounceEffect from "@hooks/useDebounceEffect";

import Input from "@atoms/Input";

import { SEARCH_POSTS } from "@queries/post/searchPosts.queries";
import { ISearchPostItem, ISearchPosts } from "@queries-types/posts";

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

  const [getSearchPostsQuery, { fetchMore, variables, data, loading }] =
    useLazyQuery<ISearchPosts>(SEARCH_POSTS);

  const fetchMorePosts = useCallback(() => {
    if (!data) return;

    const { posts } = data.searchPosts;

    if (posts.length < 10) return;

    const newVariables = { ...variables };
    newVariables.input.lastId = posts[posts.length - 1]._id;

    fetchMore({
      variables: newVariables,
    });
  }, [variables, data, fetchMore]);

  const getSearchPosts = useCallback(() => {
    getSearchPostsQuery({
      variables: {
        input: {
          text,
        },
      },
    });
  }, [text, getSearchPostsQuery]);

  useDebounceEffect(getSearchPosts, 300);
  useFetchScroll(ref, fetchMorePosts);

  return (
    <Container>
      <Input value={text} onChange={onChangeText} placeholder="검색어를 입력하세요" />
      {data?.searchPosts?.posts[0] && <SearchPost ref={ref} posts={data?.searchPosts?.posts} />}
    </Container>
  );
};

export default SearchByPosts;

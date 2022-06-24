import React, { useCallback, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useLazyQuery } from "@apollo/client";
import useInput from "@hooks/useInput";
import useDebounceEffect from "@hooks/useDebounceEffect";

import Input from "@atoms/Input";

import { SEARCH_POSTS } from "@queries/post/searchPosts.queries";
import { ISearchPosts } from "@queries-types/posts";

import Sipnner from "@molecules/Spinner";
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
  const [text, onChangeText] = useInput("");
  const [loading, setLoading] = useState<boolean>(false);

  const [getSearchPostsQuery, { fetchMore, variables, data }] =
    useLazyQuery<ISearchPosts>(SEARCH_POSTS);

  useEffect(() => {
    if (!loading && text.length) setLoading(true);
  }, [text]);

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

  const getSearchPosts = useCallback(async () => {
    await getSearchPostsQuery({
      variables: {
        input: {
          text,
        },
      },
    });
    setLoading(false);
  }, [text, getSearchPostsQuery]);

  useDebounceEffect(getSearchPosts, 300);

  return (
    <Container>
      <Input value={text} onChange={onChangeText} placeholder="검색어를 입력하세요" />
      {loading ? (
        <Sipnner />
      ) : (
        data?.searchPosts?.posts[0] && (
          <SearchPost posts={data?.searchPosts?.posts} func={fetchMorePosts} />
        )
      )}
    </Container>
  );
};

export default SearchByPosts;

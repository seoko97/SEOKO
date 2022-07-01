import React, { useCallback, useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useLazyQuery } from "@apollo/client";
import useInput from "@hooks/useInput";
import useDebounceEffect from "@hooks/useDebounceEffect";

import Input from "@atoms/Input";

import { SEARCH_POSTS } from "@queries/post/searchPosts.queries";
import { ISearchPostItem, ISearchPosts } from "@queries-types/posts";

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
  width: 700px;
  height: fit-content;

  min-height: 40vh;
  max-height: 60vh;
  box-shadow: 0px 9px 15px -15px #454545;
  margin: 128px 0;
  padding: 32px;

  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};

  & input {
    width: 100%;
    padding: 1rem;
    background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
    border: 1px solid #ccc;
    border-radius: 4px;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  & > p {
    font-weight: 700;
    font-size: 2rem;
    opacity: 0.7;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
    min-height: auto;
    margin: auto;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    margin: 40px 16px 0 16px;
    width: 100%;
    padding: 20px 16px;

    & input {
      padding: 0.6rem;
    }

    & > p {
      font-size: 1.3rem;
    }
  }
`;

const SearchByPosts = () => {
  const [text, onChangeText] = useInput("");
  const [loading, setLoading] = useState<boolean>(false);

  const [getSearchPostsQuery, { fetchMore, variables, data }] =
    useLazyQuery<ISearchPosts>(SEARCH_POSTS);

  const [posts, setPosts] = useState<ISearchPostItem[]>(data?.searchPosts.posts ?? []);

  useEffect(() => {
    if (!loading && text.length > 0) setLoading(true);
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
    const { data } = await getSearchPostsQuery({
      variables: {
        input: {
          text,
        },
      },
    });
    setPosts(data?.searchPosts.posts ?? []);
    setLoading(false);
  }, [text, getSearchPostsQuery]);

  useDebounceEffect(getSearchPosts, 300);

  return (
    <Container>
      <Input value={text} onChange={onChangeText} placeholder="검색어를 입력하세요" />
      {!loading && text.length === 0 && posts.length === 0 && <p>검색어를 입력하세요.</p>}

      {!loading && text.length > 0 && posts.length === 0 && <p>검색 결과가 없습니다.</p>}
      {loading ? (
        <Sipnner />
      ) : (
        data?.searchPosts?.posts[0] && <SearchPost posts={posts} func={fetchMorePosts} />
      )}
    </Container>
  );
};

export default SearchByPosts;

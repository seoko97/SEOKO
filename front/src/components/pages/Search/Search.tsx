import React, { useCallback, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";

import useInput from "@hooks/useInput";
import useDebounce from "@hooks/useDebounce";

import { IPost, ISearchPosts } from "@queries-types/posts";
import { SEARCH_POSTS } from "@queries/post";
import { getDataInput } from "@lib/getDataInput";

import RowFrame from "@frames/RowFrame";
import PostList from "@organisms/PostList";
import SearchForm from "@organisms/SearchForm";

const Search = () => {
  const postListRef = useRef<HTMLDivElement>(null);

  const [text, textHandler] = useInput();
  const [posts, setPosts] = useState<IPost[]>([]);

  const input = useDebounce(getDataInput({ text }), 500);

  const { data, fetchMore } = useQuery<ISearchPosts>(SEARCH_POSTS, {
    variables: { input },
    onCompleted(data) {
      setPosts(data?.searchPosts.posts);
    },
  });

  const fetchMorePosts = useCallback(() => {
    if (!data) return;

    const { posts } = data.searchPosts;

    if (posts.length < 10) return;

    const input = getDataInput({
      text,
      lastId: posts[posts.length - 1]._id,
    });

    fetchMore({ variables: { input } });
  }, [data, text]);

  return (
    <RowFrame>
      <SearchForm onChangeText={textHandler} />
      {data?.searchPosts.posts.length === 0 && posts.length === 0 && (
        <NoneContent>검색 결과가 없습니다.</NoneContent>
      )}
      <PostList posts={posts} ref={postListRef} func={fetchMorePosts} />
    </RowFrame>
  );
};

const NoneContent = styled.p`
  padding: 1em 0;

  text-align: center;
  font-size: 2em;

  color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  font-weight: bold;
`;

export default Search;

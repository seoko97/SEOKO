import React, { useCallback, useRef } from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { tagVar } from "@store/tag";

import { useQuery, useReactiveVar } from "@apollo/client";
import { IGetPosts } from "@queries-types/posts";
import { GET_POSTS } from "@queries/post";
import { getDataInput } from "@lib/getDataInput";

import PostList from "@organisms/PostList";
import ContentHeader from "./ContentHeader";

interface IFetchPostInput {
  lastId?: string;
  tag?: string;
  category?: string;
}

const MainContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const selectedTag = useReactiveVar(tagVar);
  const { category } = router.query;
  const defaultInput = getDataInput({ tag: selectedTag, category });

  const { data, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: {
      input: defaultInput,
    },
  });

  const fetchMorePosts = useCallback(() => {
    if (!data) return;

    const {
      getPosts: { posts },
    } = data;
    if (posts.length % 10 !== 0) return;

    const input: IFetchPostInput = getDataInput({
      lastId: posts[posts.length - 1]._id,
      category,
      tag: selectedTag,
    });

    fetchMore({
      variables: {
        input,
      },
    });
  }, [ref, data, selectedTag, category]);

  const onChangeCategory = useCallback(
    (category: string) => {
      const query = { ...router.query };

      if (category !== "All") {
        query.category = category.toLowerCase();
      } else {
        delete query.category;
      }

      router.push({ query });
    },
    [selectedTag, router],
  );

  return (
    <Container>
      <ContentHeader changeCategory={onChangeCategory} />
      <PostList ref={ref} posts={data?.getPosts.posts ?? []} func={fetchMorePosts} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default MainContent;

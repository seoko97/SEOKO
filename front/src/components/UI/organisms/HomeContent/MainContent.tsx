import React, { useCallback, useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { IGetPosts, IPost } from "@queries-types/posts";
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

  const { category } = router.query;
  const defaultInput = getDataInput({ category });

  const { data, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: {
      input: defaultInput,
    },
  });

  const [mainPosts, setMainPosts] = useState<IPost[]>(data?.getPosts.posts ?? []);

  useEffect(() => {
    const fetchedPosts = data?.getPosts.posts;

    if (fetchedPosts) setMainPosts(fetchedPosts);
  }, [data]);

  const fetchMorePosts = useCallback(() => {
    if (!data) return;

    const {
      getPosts: { posts },
    } = data;
    if (posts.length % 10 !== 0) return;

    const input: IFetchPostInput = getDataInput({
      lastId: posts[posts.length - 1]._id,
      category,
    });

    fetchMore({
      variables: {
        input,
      },
    });
  }, [ref, data, category]);

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
    [router],
  );

  return (
    <Container>
      <ContentHeader changeCategory={onChangeCategory} />
      <PostList ref={ref} posts={mainPosts} func={fetchMorePosts} />
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

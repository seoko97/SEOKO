import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useMutation, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

import { IDeletePost, IPost } from "@queries-types/posts";
import { DELETE_POST } from "@queries/post/deletePost.queries";
import { userInfoVar } from "@store/userInfo";

import PostNavigation from "@molecules/PostNavigation";
import TagList from "@molecules/TagList";
import Detail from "./PostDetail";

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  overflow-wrap: anywhere;

  gap: 1.2rem;
  margin: 32px 0 60px 0;

  & > h1 {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.2;
  }

  & > * {
    text-align: center;
    justify-content: center;
  }

  & > .image-container {
    width: 100%;
    aspect-ratio: 150 / 100;
    position: relative;
    align-items: center;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};

    & img {
      border-radius: 10px;
      position: absolute;
      justify-content: center;
    }
    & > span {
      border-radius: 10px;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    & > h1 {
      font-size: 1.4em;
    }
  }
`;

interface IProps {
  post: IPost;
}

const PostHeader = ({ post }: IProps) => {
  const { _id, title, coverImg, createdAt, tags, category } = post;
  const { username } = useReactiveVar(userInfoVar);
  const router = useRouter();

  const [deletePostMutation] = useMutation<IDeletePost>(DELETE_POST, {
    onCompleted({ deletePost }) {
      if (deletePost.ok) router.replace("/");
    },
  });

  const deletePost = useCallback(() => {
    if (!username) return;

    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deletePostMutation({ variables: { input: { _id } } });
  }, [username, _id]);

  const editPost = useCallback(() => {
    router.push(`/write/post/${_id}`);
  }, []);

  const onClickTag = useCallback((e) => {
    router.push(`/tag/${e.target.innerText}`);
  }, []);

  return (
    <Container>
      <div className="image-container">
        <Image priority layout="fill" alt="post-cover" src={coverImg} objectFit="cover" />
      </div>
      {post.isTemporary && <h3>임시저장</h3>}
      <h1>{title}</h1>
      {tags[0] && <TagList onClick={onClickTag} tags={tags} />}
      <Detail createdAt={createdAt} category={category} />
      {username && <PostNavigation onDelete={deletePost} onEdit={editPost} />}
    </Container>
  );
};

export default PostHeader;

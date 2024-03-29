import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Image from "@atoms/Image";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

import { IPost } from "@queries-types/posts";
import { userInfoVar } from "@store/userInfo";

import PostNavigation from "@molecules/PostNavigation";
import TagList from "@molecules/TagList";
import { useDeletePost } from "@hooks/apollo/post/usePostMutation";
import Detail from "./PostDetail";

interface IProps {
  post: IPost;
}

const PostHeader = ({ post }: IProps) => {
  const { _id, title, coverImg, createdAt, tags, category, numId } = post;
  const { username } = useReactiveVar(userInfoVar);
  const router = useRouter();

  const [deletePostMutation] = useDeletePost(_id);

  const deletePost = useCallback(() => {
    if (!username) return;

    const conf = confirm("삭제하시겠습니까?");

    if (!conf) return;

    deletePostMutation();
  }, [username, _id]);

  const editPost = useCallback(() => {
    router.push(`/write/post/${numId}`);
  }, []);

  const onClickTag = useCallback((e) => {
    router.push(`/tag/${e.target.innerText}`);
  }, []);

  return (
    <Container>
      <div className="image-container">
        <Image priority alt="post-cover" src={coverImg} />
      </div>
      {post.isTemporary && <h3>임시저장</h3>}
      <h1>{title}</h1>
      {tags[0] && <TagList onClick={onClickTag} tags={tags} />}
      <Detail createdAt={createdAt} category={category} />
      {username && <PostNavigation onDelete={deletePost} onEdit={editPost} />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  overflow-wrap: anywhere;

  gap: 1rem;
  margin: 32px 0 60px 0;

  & > h1 {
    font-weight: 700;
    font-size: 1.35rem;
    margin: 0.5rem 0 1rem 0;
  }

  & > * {
    text-align: center;
    justify-content: center;
  }

  & > .image-container {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.PRIMARY};

    & > img {
      aspect-ratio: 150 / 100;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    & > h1 {
      font-size: 1.3em;
    }
  }
`;

export default PostHeader;

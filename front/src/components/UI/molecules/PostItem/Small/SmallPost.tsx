import React, { memo } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { ISearchPost } from "@queries-types/search";
import { dateTimeParser } from "@lib/dateTimeParser";
import Link from "next/link";

interface IProps {
  post: ISearchPost;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  transition: 0.3s color;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  cursor: pointer;
  word-wrap: break-word;

  & img {
    border-radius: 8px;
    object-fit: cover;
  }

  & h3 {
    width: 100%;
    font-weight: 500;
    font-size: 1.2rem;
  }

  & span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  }

  & > div {
    display: flex;
    overflow-x: hidden;
  }

  & > div:last-of-type {
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
  }

  &:hover {
    color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & h3 {
      font-size: 1rem;
    }
    & span {
      font-size: 0.7rem;
    }
  }
`;

const SmallPost = ({ post }: IProps) => {
  return (
    <Link href={`/post/${post._id}`}>
      <Container>
        <div>
          <Image src={post.coverImg} width={64} height={64} />
        </div>
        <div>
          <h3>{post.title}</h3>
          <span>{dateTimeParser(post.createdAt)}</span>
        </div>
      </Container>
    </Link>
  );
};

export default memo(SmallPost, (prev, next) => prev.post._id === next.post._id);

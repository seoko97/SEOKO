import React from "react";
import { dateTimeParser } from "@lib/dateTimeParser";
import { IPost } from "@queries-types/posts";
import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  opacity: 0.6;
  & a:hover {
    transition: color 0.3s;
    color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
  }
`;

const Detail = ({ createdAt }: Pick<IPost, "createdAt">) => {
  return (
    <Container>
      <span>{dateTimeParser(createdAt)}</span>
    </Container>
  );
};

export default Detail;

import React from "react";
import { dateTimeParser } from "@lib/dateTimeParser";
import { IPost } from "@queries-types/posts";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;

  color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};

  font-size: 14px;
`;

const Detail = ({ category, createdAt }: Pick<IPost, "createdAt" | "category">) => {
  return (
    <Container>
      <span>{dateTimeParser(createdAt)}</span>
      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
    </Container>
  );
};

export default Detail;

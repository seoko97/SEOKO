import React, { useCallback } from "react";
import { dateTimeParser } from "@lib/dateTimeParser";
import { IPost } from "@queries-types/posts";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  color: ${({ theme }) => theme.FONT_COLOR.SECONDARY_COLOR};
  & a:hover {
    transition: color 0.3s;
    color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
  }
  font-size: 14px;
`;

const Detail = ({ createdAt }: Pick<IPost, "createdAt">) => {
  return (
    <Container>
      <span>{dateTimeParser(createdAt)}</span>
    </Container>
  );
};

export default Detail;

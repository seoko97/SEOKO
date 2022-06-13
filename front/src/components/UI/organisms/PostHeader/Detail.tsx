import React, { useCallback } from "react";
import { dateTimeParser } from "@lib/dateTimeParser";
import { IPost } from "@queries-types/posts";
import styled from "@emotion/styled";
import UserInfo from "@molecules/UserInfo/UserInfo";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const onClickUserInfo = useCallback(() => router.push("/about"), []);

  return (
    <Container>
      <UserInfo onClick={onClickUserInfo} />
      <span>·</span>
      <span>{dateTimeParser(createdAt)}</span>
    </Container>
  );
};

export default Detail;

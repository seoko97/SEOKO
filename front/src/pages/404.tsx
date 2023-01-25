import React from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";

const NotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <h2>페이지를 찾을 수 없습니다 😭</h2>
      <NextLink href="/">
        <button>홈으로 이동</button>
      </NextLink>
    </Container>
  );
};

const Container = styled(RowFrame)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;

  gap: 1.5rem;
  transition: color 0.2s;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  & > h1 {
    font-size: 10rem;
    line-height: 10rem;
    color: #ababab;
    font-weight: 700;
  }

  & > h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  & button {
    font-size: 0.9rem;
    border: 0;
    background-color: ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};

    color: #ffffff;
    font-weight: 500;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
  }
`;

export default NotFound;

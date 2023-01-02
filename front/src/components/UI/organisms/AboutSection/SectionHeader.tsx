import React from "react";
import { useReactiveVar } from "@apollo/client";
import { userInfoVar } from "@store/userInfo";
import styled from "@emotion/styled";

interface IProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const SectionHeader = ({ onClick, children }: IProps) => {
  const { username } = useReactiveVar(userInfoVar);

  return (
    <Container>
      <h1>{children}</h1>
      {username && onClick && <span onClick={() => onClick()}>관리</span>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 1em;
  margin-bottom: 1em;

  & > h1 {
    font-size: 2em;
    font-weight: bold;
  }

  & > span {
    font-weight: 400;
  }
`;

export default SectionHeader;

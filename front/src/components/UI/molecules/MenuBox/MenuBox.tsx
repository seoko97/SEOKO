import React, { memo } from "react";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import styled from "@emotion/styled";
import { userInfoVar } from "@store/userInfo";
import SearchIcon from "@icons/SearchIcon/SearchIcon";
import UserMenu from "./UserMenu";
import Menu from "./BaseMenu";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  gap: 15px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    cursor: pointer;
    transition: fill 0.3s;
    &:hover {
      fill: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    }
  }
`;

const MenuBox = () => {
  const { username } = useReactiveVar(userInfoVar);

  return (
    <Container>
      {username && <UserMenu />}
      <Link href="/search">
        <div>
          <SearchIcon />
        </div>
      </Link>
      <Menu username={username} />
    </Container>
  );
};

export default memo(MenuBox);

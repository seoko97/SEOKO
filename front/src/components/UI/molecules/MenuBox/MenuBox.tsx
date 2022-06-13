import React from "react";
import { useReactiveVar } from "@apollo/client";
import styled from "@emotion/styled";
import { userInfoVar } from "@store/userInfo";
import SearchIcon from "@icons/SearchIcon/SearchIcon";
import useModal from "@hooks/useModal";
import SearchModal from "@modals/SearchModal";
import UserMenu from "./UserMenu";
import Menu from "./BaseMenu";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  gap: 20px;
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
  const [isOpen, openSearchForm, closeSearchForm] = useModal();

  return (
    <Container>
      {username && <UserMenu />}
      <div onClick={openSearchForm}>
        <SearchIcon />
      </div>
      {isOpen && <SearchModal isOpen={isOpen} onClose={closeSearchForm} />}
      <Menu username={username} />
    </Container>
  );
};

export default MenuBox;

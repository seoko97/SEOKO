import React from "react";
import styled from "@emotion/styled";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 1;
  cursor: pointer;
  transition: 0.3s color;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  &:hover {
    color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & span {
      display: none;
    }
  }
`;

interface IProps {
  onClick: () => void;
}

const UserInfo = ({ onClick }: IProps) => {
  return (
    <UserContainer onClick={onClick}>
      <span>지석호</span>
    </UserContainer>
  );
};

export default UserInfo;

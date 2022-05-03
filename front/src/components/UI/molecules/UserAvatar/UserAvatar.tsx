import React from "react";

import styled from "@emotion/styled";

interface IProps {
  width: number;
  height: number;
  onClick?: () => void;
}
const StyledUserAvatar = styled.div<IProps>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: 50%;
  background-color: #ccc;

  & > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const UserAvatar = ({ height, width, onClick }: IProps) => {
  return (
    <>
      <StyledUserAvatar onClick={onClick && onClick} width={width} height={height}>
        <img src="/main.jpg" alt="me" loading="lazy" />
      </StyledUserAvatar>
    </>
  );
};

export default React.memo(UserAvatar);

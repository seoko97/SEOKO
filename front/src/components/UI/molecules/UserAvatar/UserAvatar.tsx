import React from "react";

import styled from "@emotion/styled";
import Image from "next/image";

interface IProps {
  width: number;
  height: number;
  onClick?: () => void;
}
const Container = styled.div`
  display: flex;

  & img,
  & span {
    border-radius: 50%;
  }
`;

const UserAvatar = ({ height, width, onClick }: IProps) => {
  return (
    <Container onClick={onClick && onClick}>
      <Image priority src="/main.jpg" objectFit="cover" alt="user" width={width} height={height} />
    </Container>
  );
};

export default UserAvatar;

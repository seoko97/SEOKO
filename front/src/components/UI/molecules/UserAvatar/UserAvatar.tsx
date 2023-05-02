import React from "react";

import styled from "@emotion/styled";
import Image from "next/future/image";

interface IProps {
  width: number;
  height: number;
  onClick?: () => void;
}
const Container = styled.div`
  display: flex;

  & img {
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UserAvatar = ({ height, width, onClick }: IProps) => {
  return (
    <Container onClick={onClick && onClick}>
      <Image priority src="/main.jpg" alt="user" width={width} height={height} />
    </Container>
  );
};

export default UserAvatar;

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
  align-items: center;
  justify-content: center;
  height: fit-content;
  border-radius: 50%;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border-radius: 50%;
    object-fit: cover;
  }

  & * {
    border-radius: 50%;
  }
`;

const UserAvatar = ({ height, width, onClick }: IProps) => {
  return (
    <Container onClick={onClick && onClick}>
      <Image src="/main.jpg" alt="user" priority={true} width={width} height={height} />
    </Container>
  );
};

export default React.memo(UserAvatar);

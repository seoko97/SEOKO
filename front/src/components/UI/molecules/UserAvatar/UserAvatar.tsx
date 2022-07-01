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
`;

const UserAvatar = ({ height, width, onClick }: IProps) => {
  return (
    <Container onClick={onClick && onClick}>
      <Image
        src="https://velog.velcdn.com/post-images/godori/496c0830-3dc1-11e9-bc03-611ba17bddf2/banner-maker.png"
        width={width}
        height={height}
      />
    </Container>
  );
};

export default React.memo(UserAvatar);

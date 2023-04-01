import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface Props {
  src: string;
  idx: number;
}

const StyledPostImg = styled.div`
  position: relative;
  width: 250px;
  padding-bottom: 200px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};

  & img {
    position: absolute;
    object-fit: cover;
  }
  & > span {
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    padding-bottom: 70%;
  }
`;

const PostImg = ({ src, idx }: Props) => {
  return (
    <StyledPostImg className="post-image">
      <Image
        priority={idx <= 5}
        loading={idx > 5 ? "lazy" : "eager"}
        src={src}
        layout="fill"
        alt="post-image"
      />
    </StyledPostImg>
  );
};

export default PostImg;

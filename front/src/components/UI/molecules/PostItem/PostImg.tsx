import React from "react";
import styled from "@emotion/styled";
import Image from "next/future/image";

interface Props {
  src: string;
  idx: number;
}

const StyledPostImg = styled.div`
  position: relative;
  width: 250px;
  aspect-ratio: 130 / 100;

  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
  overflow: "hidden";

  & > img {
    object-fit: cover;
    border-radius: 10px;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

const PostImg = ({ src, idx }: Props) => {
  return (
    <StyledPostImg className="post-image">
      <Image
        alt="post-image"
        priority={idx <= 5}
        loading={idx > 5 ? "lazy" : "eager"}
        src={src}
        fill
      />
    </StyledPostImg>
  );
};

export default PostImg;

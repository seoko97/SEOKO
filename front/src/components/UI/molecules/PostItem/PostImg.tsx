import React from "react";
import styled from "@emotion/styled";
import Image from "@atoms/Image";

interface Props {
  src: string;
  idx: number;
}

const StyledPostImg = styled.div`
  position: relative;

  display: flex;
  width: 250px;

  aspect-ratio: 130 / 100;

  border-radius: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;

  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

const PostImg = ({ src, idx }: Props) => {
  return (
    <StyledPostImg className="post-image">
      <Image alt="post-image" priority={idx <= 5} loading={idx > 5 ? "lazy" : "eager"} src={src} />
    </StyledPostImg>
  );
};

export default PostImg;

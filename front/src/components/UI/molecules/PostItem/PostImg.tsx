import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface Props {
  titleImage: string;
}

const StyledPostImg = styled.div`
  position: relative;
  width: 250px;
  padding-bottom: 200px;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

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

const PostImg = ({ titleImage }: Props) => (
  <StyledPostImg className="post-image">
    <Image loading="lazy" src={titleImage} layout="fill" alt="post-image" />
  </StyledPostImg>
);

export default PostImg;

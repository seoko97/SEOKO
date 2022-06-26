import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

interface Props {
  titleImage: string;
}

const StyledPostImg = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  padding-bottom: 200px;
  border-radius: 10px;
  background-color: #ccc;
  & img {
    border-radius: 10px;
    position: absolute;
    object-fit: cover;
  }

  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    padding-bottom: 70%;
  }
`;

const PostImg = ({ titleImage }: Props) => (
  <StyledPostImg>
    <Image src={titleImage} property="true" layout="fill" />
  </StyledPostImg>
);

export default PostImg;

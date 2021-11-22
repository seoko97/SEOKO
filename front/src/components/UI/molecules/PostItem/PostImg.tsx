import styled from "@emotion/styled";
import React from "react";

interface Props {
  titleImage: string;
}

const StyledPostImg = styled.div`
  width: 250px;
  height: 200px;
  overflow: hidden;
  position: relative;

  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px 0 0 5px;
    object-fit: cover;
    object-position: center center;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    flex-direction: column;

    width: 100%;
    height: auto;
    padding-bottom: 70%;

    & img {
      border-radius: 5px 5px 0 0;
    }
  }
`;

const PostImg = ({ titleImage }: Props) => {
  return (
    <>
      <StyledPostImg>
        <img src={titleImage} />
      </StyledPostImg>
    </>
  );
};

export default PostImg;

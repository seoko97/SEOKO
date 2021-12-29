import styled from "@emotion/styled";
import React from "react";

interface Props {
  titleImage: string;
}

const StyledPostImg = styled.div`
  width: 250px;
  height: 100%;

  & > div {
    width: 100%;
    position: relative;
    padding-bottom: 200px;
    & img {
      border-radius: 10px;
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET_Y}) {
    width: 100%;
    max-height: 400px;
    & > div {
      padding-bottom: 70%;
    }

    flex-direction: column;
  }
`;

const PostImg = ({ titleImage }: Props) => {
  return (
    <>
      <StyledPostImg>
        <div>
          <img src={titleImage} alt="titleImg" />
        </div>
      </StyledPostImg>
    </>
  );
};

export default PostImg;

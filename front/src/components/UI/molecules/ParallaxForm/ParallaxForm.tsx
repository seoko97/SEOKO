import React from "react";
import styled from "@emotion/styled";

interface Props {
  imgSrc: string;
  children: React.ReactNode;
}

const StyledParallaxForm = styled.div<Props>`
  position: absolute;
  top: 0;

  background-image: url(${({ imgSrc }) => imgSrc});

  background-size: cover;
  background-attachment: fixed;
  background-position: center;

  width: 100%;

  z-index: -1;

  padding: 160px 0;
  text-align: center;
  color: #fff;

  & > h2 {
    font-size: 70px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  & > p {
    font-size: 20px;
  }

  & div#over {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #212529;
    opacity: 0.6;
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    background-attachment: scroll;

    & > h2 {
      font-size: 55px;
    }

    & > p {
      font-size: 16px;
    }
  }
`;

const ParallaxForm = ({ children, imgSrc }: Props) => {
  return (
    <>
      <StyledParallaxForm imgSrc={imgSrc}>
        <div id="over"></div>
        {children}
      </StyledParallaxForm>
    </>
  );
};

export default ParallaxForm;

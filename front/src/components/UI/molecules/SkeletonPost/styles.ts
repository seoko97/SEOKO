import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  margin-bottom: 30px;
  border-radius: 10px;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    flex-direction: column;
    gap: 0;
    padding: 0;
  }
`;
const sAnimation = css`
  @keyframes loading {
    0% {
      transform: translateX(0);
    }

    50%,
    100% {
      width: 100%;
      transform: translateX(100%);
    }
  }

  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(to right, #ddd, #ccc, #ddd);
    animation: loading 2s infinite linear;
  }
`;

const Image = styled.div`
  width: 250px;
  padding-bottom: 200px;
  border-radius: 10px;
  background-color: #ddd;
  ${sAnimation}

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    padding-bottom: 70%;
  }
`;

const PostContent = styled.div`
  flex: 1;
  box-sizing: border-box;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.7em;

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
    padding: 10px 5px;
    justify-content: flex-start;
    min-height: 0;
  }
`;

const Content = styled.p<{ w: string; h: string }>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  background-color: #ddd;
  border-radius: 7px;
  ${sAnimation}
`;

const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5em;
`;

const Tag = styled.p`
  width: 50px;
  height: 22px;
  background-color: #ddd;
  border-radius: 7px;
  ${sAnimation}
`;

export default { Container, Image, PostContent, Content, TagWrapper, Tag };

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const Footer = styled.footer`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 20px;

  & > button {
    border: 0;
    padding: 8px 10px;
    cursor: pointer;
    background-color: #367ddd;
    color: #fff;
    border-radius: 3px;
    font-size: 18px;
    font-weight: bold;

    &.close {
      background-color: #ff4136;
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;

interface Props {
  addPost: () => void;
}

const WritePostFooter = ({ addPost }: Props) => {
  const router = useRouter();

  const onMovePage = useCallback(() => router.back(), []);
  return (
    <Footer>
      <button onClick={addPost}>저장</button>
      <button className="close" onClick={onMovePage}>
        나가기
      </button>
    </Footer>
  );
};

export default WritePostFooter;

import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import Button from "@atoms/Button";

const Footer = styled.footer`
  width: ${({ theme }) => theme.BP.PC};
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;

  & > div {
    display: flex;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.BP.PC}) {
    width: 100%;
    font-size: 0.8rem;
  }
`;

interface Props {
  save: React.MouseEventHandler<HTMLButtonElement>;
}

const WriteFooter = ({ save }: Props) => {
  const router = useRouter();

  const onMovePage = useCallback(() => router.back(), []);

  return (
    <Footer>
      <Button buttonSize="large" onClick={save} data-is-temporary="true">
        임시저장
      </Button>
      <div>
        <Button buttonType="primary" buttonSize="large" onClick={save}>
          저장
        </Button>
        <Button buttonType="danger" buttonSize="large" className="close" onClick={onMovePage}>
          나가기
        </Button>
      </div>
    </Footer>
  );
};

export default WriteFooter;

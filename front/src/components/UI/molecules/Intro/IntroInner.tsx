import styled from "@emotion/styled";
import React from "react";
import Info from "./Info";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 15px;
  text-wrap: wrap;
  gap: 15px;

  & .nick {
    font-size: 20px;
    font-weight: 500;
  }

  & .desc {
    font-weight: 300;
  }
`;

const IntroInner = () => {
  return (
    <Container>
      <p className="nick">👨🏻‍💻 지석호</p>
      <p className="desc">
        프론트엔드 개발자를 희망하고 있는 지석호입니다. 개발이 취미이며 기록하는 것을 좋아합니다.
      </p>
      <Info />
    </Container>
  );
};

export default IntroInner;

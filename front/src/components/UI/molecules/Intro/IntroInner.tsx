import styled from "@emotion/styled";
import React from "react";
import Info from "./Info";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  overflow-wrap: anywhere;
  gap: 15px;

  & > h3 {
    font-size: 20px;
    font-weight: 500;
  }

  & > p {
    font-weight: 300;
  }
`;

const IntroInner = () => {
  return (
    <Container>
      <h3>👨🏻‍💻 지석호</h3>
      <p>
        프론트엔드 개발자를 희망하고 있는 지석호입니다. 개발이 취미이며 기록하는 것을 좋아합니다.
      </p>
      <Info />
    </Container>
  );
};

export default IntroInner;

import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const sipinner = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  min-width: 40px;
  min-height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-right: 5px solid ${({ theme }) => theme.FONT_COLOR.LOGO_COLOR};
  border-radius: 50%;
  animation: ${sipinner} 1s linear infinite;
`;

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sipnner = () => {
  return (
    <Container>
      <StyledSpinner />
    </Container>
  );
};

export default Sipnner;

import React from "react";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";
import SignInForm from "@organisms/SignInForm";

const Container = styled(RowFrame)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 244px);

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & div {
      width: 100%;
    }
  }
`;

const SignIn = () => {
  return (
    <Container>
      <SignInForm />
    </Container>
  );
};

export default SignIn;

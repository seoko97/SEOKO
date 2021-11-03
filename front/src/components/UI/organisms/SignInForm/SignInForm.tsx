import React from "react";
import styled from "@emotion/styled";
import Card from "@atoms/Card";
import RowFrame from "@frames/RowFrame";
import SignInFormSection from "./SignInFormSection";

const StyledSignInForm = styled.div`
  width: 100%;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 244px);

    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    & > div {
      & div {
        width: 100%;
      }
    }
  }
`;

const SignInForm = () => {
  return (
    <>
      <StyledSignInForm>
        <RowFrame>
          <Card>
            <SignInFormSection />
          </Card>
        </RowFrame>
      </StyledSignInForm>
    </>
  );
};

export default SignInForm;

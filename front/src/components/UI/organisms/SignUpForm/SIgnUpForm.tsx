import React from "react";
import styled from "@emotion/styled";

import RowFrame from "@frames/RowFrame";
import Card from "@atoms/Card";
import SignUpFormSection from "./SignUpFormSection";

const StyledSignUpForm = styled.div`
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

const SignUpForm = () => {
  return (
    <>
      <StyledSignUpForm>
        <RowFrame>
          <Card>
            <SignUpFormSection />
          </Card>
        </RowFrame>
      </StyledSignUpForm>
    </>
  );
};

export default SignUpForm;

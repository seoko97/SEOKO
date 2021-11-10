import React from "react";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";

import Footer from "@organisms/Footer";
import Header from "@organisms/Header";
import SigninUserHeader from "@molecules/SigninUserHeader";
import { userState } from "@states/users/atoms";

const StyledAppLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 140px);
  position: relative;
  padding-bottom: 140px;
  background-color: ${({ theme }) => theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
  transition: background 0.3s;
  z-index: 0;
`;

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      <StyledAppLayout>
        {userInfo && <SigninUserHeader />}
        <Header />
        {children}
        <Footer />
      </StyledAppLayout>
    </>
  );
};

export default AppLayout;

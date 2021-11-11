import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";

import Footer from "@organisms/Footer";
import Header from "@organisms/Header";
import SigninUserHeader from "@molecules/SigninUserHeader";
import { userState } from "@states/users/atoms";
import { initatialSigninCheck } from "@src/apis/users";

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
  const [userInfo, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    initatialSigninCheck().then((res) => {
      // console.log(res);
      // if (res.pass) setUserInfo(res.username);
    });
  }, []);

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

import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";
import { userState } from "@states/users/atoms";
import { onSignout } from "@apis/users";

const StyledSigninUserHeader = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  & > div {
    padding-top: 10px;
    text-align: right;

    & span:first-of-type {
      margin-right: 5px;
    }
  }
`;

const SigninUserHeader = () => {
  const [userinfo, setUserinfo] = useRecoilState(userState);

  const onClickSignout = useCallback(() => {
    onSignout().then((res) => {
      if (res.pass) setUserinfo(null);
    });
  }, []);

  return (
    <>
      <StyledSigninUserHeader>
        <RowFrame>
          <span>{userinfo}</span>
          <span onClick={onClickSignout}>로그아웃</span>
        </RowFrame>
      </StyledSigninUserHeader>
    </>
  );
};

export default SigninUserHeader;

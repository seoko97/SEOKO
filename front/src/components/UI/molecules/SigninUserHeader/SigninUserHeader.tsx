import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import RowFrame from "@frames/RowFrame";
import { userState } from "@states/users/atoms";
import { onSignout } from "@apis/users";

const StyledSigninUserHeader = styled.div`
  width: 100vw;
  height: 32px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 2;

  & > div {
    text-align: right;
    padding: 10px 10px 0 0;

    & span:first-of-type {
      margin-right: 5px;
    }
    & span:last-of-type {
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
      }
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

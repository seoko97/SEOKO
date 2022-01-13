import React, { useEffect } from "react";
import { useRecoilCallback, useRecoilState } from "recoil";
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
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  z-index: 1;

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

interface Props {
  user: string | null;
}
const SigninUserHeader = ({ user }: Props) => {
  const [userinfo, setUserinfo] = useRecoilState(userState);

  useEffect(() => {
    setUserinfo(user);
  }, [user]);

  const signout = useRecoilCallback(({ reset }) => async () => {
    const result: any = await onSignout();

    if (result.pass) reset(userState);
  });

  return (
    <>
      {userinfo && (
        <StyledSigninUserHeader>
          <RowFrame>
            <span>{userinfo}</span>
            <span onClick={signout}>로그아웃</span>
          </RowFrame>
        </StyledSigninUserHeader>
      )}
    </>
  );
};

export default SigninUserHeader;

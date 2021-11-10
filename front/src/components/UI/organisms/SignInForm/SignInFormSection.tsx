import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import Input from "@atoms/Input";
import Button from "@atoms/Button";
import useInput from "@hooks/useInput";
import { onSignin } from "@apis/users";
import { userState } from "@states/users/atoms";

const StyledFormSection = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
  box-sizing: border-box;
  max-width: 400px;
  border-top: 4px solid ${({ theme }) => theme.BUTTON_COLOR.PRIMARY_COLOR};
  width: 400px;

  & div {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 10px;
    font-size: 18px;
    & > h1 {
      font-weight: 600;
      text-align: center;
    }
    &:first-of-type {
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
    & > input {
      box-sizing: border-box;
      width: 100%;
      &:first-of-type {
        margin-bottom: 16px;
      }
    }
    & > button {
      width: 100%;
      padding: 12px 0;
      font-size: 15px;
      font-weight: 500;
    }
    &:last-of-type {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      padding: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

const SignInFormSection = () => {
  const { value: userId, handler: onChangeId } = useInput("");
  const { value: password, handler: onChangePassword } = useInput("");
  const setUserInfo = useSetRecoilState(userState);
  const router = useRouter();

  const onClickSignInBtn = useCallback(
    (e) => {
      e.preventDefault();
      if (userId.length === 0) return alert("아이디를 입력하세요");
      if (password.length === 0) return alert("비밀번호를 입력하세요");
      const info = {
        userId,
        password,
      };

      onSignin(info)
        .then((res) => {
          if (res.pass) {
            alert("로그인 성공");
            setUserInfo(res.username);
            router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [userId, password],
  );

  return (
    <>
      <StyledFormSection onSubmit={onClickSignInBtn}>
        <div>
          <h1>로그인</h1>
        </div>
        <div>
          <Input value={userId} onChange={onChangeId} placeholder="아이디" />
          <Input
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            type="password"
          />
        </div>
        <div>
          <Button content="Sign In" />
        </div>
        <div>
          <Link href="/signup">회원가입</Link>
        </div>
      </StyledFormSection>
    </>
  );
};

export default SignInFormSection;

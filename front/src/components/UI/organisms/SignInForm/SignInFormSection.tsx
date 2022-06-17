import React, { useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { useMutation, useReactiveVar } from "@apollo/client";

import Input from "@atoms/Input";
import Button from "@atoms/Button";

import useInput from "@hooks/useInput";
import { setUserInfo, userInfoVar } from "@store/userInfo";
import { SIGN_IN } from "@queries/users";
import { ISignIn } from "@queries-types/users";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 30px 10px;
  box-sizing: border-box;
  border-top: 4px solid ${({ theme }) => theme.BUTTON_COLOR.PRIMARY_COLOR};

  & > h1 {
    font-weight: 600;
    text-align: center;
  }

  & div {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 10px;
    font-size: 18px;

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
    }
    &:last-of-type {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      padding: 0 10px;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

const SignInFormSection = () => {
  const router = useRouter();
  const [userId, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { username } = useReactiveVar(userInfoVar);
  const [signin, { loading }] = useMutation<ISignIn>(SIGN_IN, {
    onCompleted({ signin }) {
      const { ok, username } = signin;
      if (ok) setUserInfo(username);
    },
    onError(error) {
      alert(error.message);
    },
  });

  useEffect(() => {
    if (username) router.push("/");
  }, [username]);

  const onClickSignInBtn = useCallback(
    async (e) => {
      e.preventDefault();
      if (userId.length === 0) return alert("아이디를 입력하세요");
      if (password.length === 0) return alert("비밀번호를 입력하세요");

      await signin({
        variables: {
          input: { userId, password },
        },
      });
    },
    [userId, password],
  );

  return (
    <Container onSubmit={onClickSignInBtn}>
      <h1>로그인</h1>
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
        <Button loading={loading} content="로그인" />
      </div>
    </Container>
  );
};

export default SignInFormSection;

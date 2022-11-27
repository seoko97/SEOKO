import React, { useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { useMutation, useReactiveVar } from "@apollo/client";

import { setUserInfo, userInfoVar } from "@store/userInfo";
import { SIGN_IN } from "@queries/users";
import { ISignIn } from "@queries-types/users";

import Input from "@atoms/Input";
import Button from "@atoms/Button";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 2em 1em;
  border-radius: 0.5em;
  gap: 1em;
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};
  box-shadow: 0 1px 6px 0 hsla(0, 0%, 0%, 0.1);

  & > input {
    width: 100%;
  }

  & > button {
    width: 100%;
    padding: 12px 0;
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

const SignInForm = () => {
  const router = useRouter();
  const signInDataRef = useRef({
    userId: "",
    password: "",
  });

  const { username } = useReactiveVar(userInfoVar);
  const [signin, { loading }] = useMutation<ISignIn>(SIGN_IN, {
    onCompleted({ signin }) {
      const { ok, username } = signin;
      if (ok) setUserInfo(username);
    },
  });

  useEffect(() => {
    if (username) router.push("/");
  }, [username]);

  const onClickSignInBtn = useCallback(
    (e) => {
      e.preventDefault();
      const { userId, password } = signInDataRef.current;

      if (!userId) return alert("아이디를 입력하세요");
      if (!password) return alert("비밀번호를 입력하세요");

      signin({
        variables: {
          input: signInDataRef.current,
        },
      });
    },
    [signInDataRef.current],
  );

  const onChangeValue: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const type = e.target.name as keyof typeof signInDataRef.current;

    signInDataRef.current[type] = e.target.value;
  }, []);

  return (
    <Container onSubmit={onClickSignInBtn}>
      <Input onChange={onChangeValue} placeholder="아이디" name="userId" />
      <Input onChange={onChangeValue} placeholder="비밀번호" type="password" name="password" />
      <Button loading={loading} content="로그인" />
    </Container>
  );
};

export default SignInForm;

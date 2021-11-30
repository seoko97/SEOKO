import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import useInput from "@hooks/useInput";

import Input from "@atoms/Input";
import Button from "@atoms/Button";
import { onSignup } from "@apis/users";

const StyledFormSection = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
  box-sizing: border-box;
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
      margin-bottom: 16px;
      &:last-of-type {
        margin: 0;
      }
    }
    & > button {
      width: 100%;
      padding: 12px 0;
      font-size: 15px;
      font-weight: 500;
    }
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

const SignUpFormSection = () => {
  const { value: userId, handler: onChangeId } = useInput("");
  const { value: password, handler: onChangePassword } = useInput("");
  const { value: username, handler: onChangeUsername } = useInput("");
  const router = useRouter();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!userId.length) return alert("아이디를 입력하세요");
      else if (!password.length) return alert("비밀번호를 입력하세요");
      else if (!username.length) return alert("이름을 입력하세요");

      const userInfo = {
        userId,
        password,
        username,
      };
      onSignup(userInfo).then((res) => {
        if (res.pass) {
          alert(res.message);
          router.push("/");
        } else alert(res.err);
      });
    },
    [userId, password, username],
  );

  return (
    <>
      <StyledFormSection onSubmit={onSubmit}>
        <div>
          <h1>회원가입</h1>
        </div>
        <div>
          <Input value={userId} onChange={onChangeId} placeholder="아이디" />
          <Input
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            type="password"
          />
          <Input value={username} onChange={onChangeUsername} placeholder="이름" />
        </div>
        <div>
          <Button content="회원가입" />
        </div>
      </StyledFormSection>
    </>
  );
};

export default SignUpFormSection;

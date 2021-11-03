import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Input from "@atoms/Input/Input";
import useInput from "@src/hooks/useInput";
import Button from "../../atoms/Button/Button";

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
    /* &:last-of-type {
      padding: 0 10px;
    } */
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
  }

  @media (max-width: ${({ theme }) => theme.BP.MOBILE}) {
    width: 100%;
  }
`;

const SignInFormSection = () => {
  const { value: id, handler: onChangeId } = useInput("");
  const { value: password, handler: onChangePassword } = useInput("");

  const onSignIn = useCallback(
    (e) => {
      e.preventDefault();
      if (id.length === 0) return alert("아이디를 입력하세요");
      if (password.length === 0) return alert("비밀번호를 입력하세요");
    },
    [id, password],
  );

  return (
    <>
      <StyledFormSection onSubmit={onSignIn}>
        <div>
          <h1>로그인</h1>
        </div>
        <div>
          <Input value={id} onChange={onChangeId} placeholder="아이디" />
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
      </StyledFormSection>
    </>
  );
};

export default SignInFormSection;

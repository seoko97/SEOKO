import React from "react";
import styled from "@emotion/styled";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const StyledInput = styled.input`
  padding: 10px 14px;
  border-radius: 3px;
  border: 0;
  border: 1px solid #d2d6dc;
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
`;

const Input = ({ value, onChange, type, placeholder }: Props) => {
  return (
    <>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

Input.defaultProps = {
  type: "text",
  placeholder: "입력",
};

export default Input;

import React from "react";
import styled from "@emotion/styled";

type Props = React.ComponentProps<"input">;

const StyledInput = styled.input`
  padding: 10px 14px;
  border-radius: 3px;
  border: 0;
  border: 1px solid #d2d6dc;

  :focus-visible {
    border: 1px solid ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
    outline: 0 !important;
  }
`;

const Input = ({ value, placeholder, type, onChange }: Props) => {
  return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />;
};

Input.defaultProps = {
  type: "text",
  placeholder: "입력",
};

export default Input;

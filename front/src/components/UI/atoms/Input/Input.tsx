import React, { forwardRef } from "react";
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

const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, placeholder, type, onChange, ...props }, ref) => {
    return (
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.defaultProps = {
  type: "text",
  placeholder: "입력",
};

export default Input;

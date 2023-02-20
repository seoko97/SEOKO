import React, { forwardRef } from "react";
import styled from "@emotion/styled";

type Props = React.ComponentProps<"input">;

const StyledInput = styled.input`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border-radius: 3px;
  transition: border-color 0.2s, background-color 0.2s;

  border: 1px solid #b4bac2;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};

  :focus-visible {
    border-color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
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

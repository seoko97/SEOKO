import React, { forwardRef } from "react";
import styled from "@emotion/styled";

type Props = React.ComponentProps<"input">;

const StyledInput = styled.input`
  width: 100%;

  padding: 0.5rem 2rem 0.5rem 1rem;
  border-radius: 3px;
  transition: border-color 0.2s, background-color 0.2s;

  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  border: 1px solid ${({ theme }) => theme.BORDER_COLOR.PRIMARY_COLOR};
  background-color: ${({ theme }) => theme.BACKGROUND_COLOR.SECONDARY_COLOR};

  &:focus-visible {
    outline: 0 !important;
    border-color: ${({ theme }) => theme.SELECTION_EFFECT_COLOR.PRIMARY_COLOR};
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

import styled from "@emotion/styled";
import React from "react";

interface Props {
  content: string;
  loading: boolean;
}

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.BUTTON_COLOR.PRIMARY_COLOR};
  border: 0;
  border-radius: 3px;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  cursor: pointer;
  transition: filter 0.3s;
  &:hover {
    filter: brightness(80%);
  }
`;

const Button = ({ content, loading }: Props) => {
  return <StyledButton disabled={loading}>{content}</StyledButton>;
};

Button.defaultProps = {
  content: "저장",
};

export default Button;

import styled from "@emotion/styled";
import React from "react";

interface Props {
  content: string;
}

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.BUTTON_COLOR.PRIMARY_COLOR};
  border: 0;
  border-radius: 3px;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
`;

const Button = ({ content }: Props) => {
  return (
    <>
      <StyledButton>{content}</StyledButton>
    </>
  );
};

Button.defaultProps = {
  content: "저장",
};

export default Button;

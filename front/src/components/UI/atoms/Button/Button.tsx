import React from "react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { ThemeType } from "@theme/.";

interface StyleProps {
  [key: string]: CSSObject;
}

interface IButtonProps {
  buttonSize?: "default" | "large" | "small";
  buttonType?: "default" | "primary" | "danger";
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, IButtonProps {}

const BUTTON_SIZE: StyleProps = {
  default: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
  },
  large: {
    fontSize: "1.2rem",
    padding: "1rem 1.2rem",
  },
  small: {
    fontSize: "1rem",
    padding: "0.5rem 1rem",
  },
};

const BUTTON_TYPE = (theme: ThemeType): StyleProps => ({
  default: {
    border: `1px solid ${theme.BUTTON_COLOR.PRIMARY_COLOR}`,
    backgroundColor: theme.BACKGROUND_COLOR.SECONDARY_COLOR,
    color: theme.BUTTON_COLOR.PRIMARY_COLOR,
  },
  primary: {
    backgroundColor: theme.BUTTON_COLOR.PRIMARY_COLOR,
    fontWeight: "bold",
    color: "#ffffff",
  },
  danger: {
    border: `1px solid ${theme.BUTTON_COLOR.DANGER_COLOR}`,
    backgroundColor: theme.BACKGROUND_COLOR.SECONDARY_COLOR,
    color: theme.BUTTON_COLOR.DANGER_COLOR,
  },
});

const StyledButton = styled.button<Required<IButtonProps>>`
  border: 0;
  border-radius: 3px;
  color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
  font-weight: 500;
  transition: filter 0.3s;
  cursor: pointer;

  &:hover {
    filter: brightness(105%);
  }

  ${({ buttonSize, buttonType, theme }) => ({
    ...BUTTON_SIZE[buttonSize],
    ...BUTTON_TYPE(theme)[buttonType],
  })}
`;

const Button: React.FC<Props> = ({
  children,
  buttonSize = "default",
  buttonType = "default",
  ...props
}) => {
  return (
    <StyledButton buttonSize={buttonSize} buttonType={buttonType} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

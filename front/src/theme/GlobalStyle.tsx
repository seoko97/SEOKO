import React from "react";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import { ThemeType } from ".";

interface GlobalProps {
  theme: ThemeType;
}

const GlobalStyle = ({ theme }: GlobalProps) => (
  <Global
    styles={css`
      ${reset}

      html, body, #__next {
        height: 100%;
      }

      body {
        overflow-y: overlay;
        margin: 0;
        font-size: 14px;
        line-height: 1.5715;
        user-select: none;
        background-color: ${theme.BAKCGROUND_COLOR.PRIMARY_COLOR};
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
      }
      a {
        color: inherit;
        text-decoration: none;
        outline: none;
      }
      & * {
        font-family: "Quicksand", "Noto Sans KR", sans-serif !important;
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;

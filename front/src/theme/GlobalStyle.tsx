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

      html {
        font-family: "Noto Sans KR", sans-serif !important;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -o-text-size-adjust: none;
      }

      body,
      #__next {
        height: 100%;
      }

      body {
        height: 100%;
        margin: 0;
        font-size: 16px;
        line-height: 1.5715;
        user-select: none;
        background-color: ${theme.BACKGROUND_COLOR.PRIMARY_COLOR};
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

      input,
      textarea,
      button {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border-radius: 0;
        -webkit-border-radius: 0;
        -moz-border-radius: 0;
      }

      input:focus-visible {
        outline: 0;
      }

      ::-webkit-scrollbar {
        width: 5px;
        height: 10px;
        background-color: inherit;
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${theme.FONT_COLOR.SECONDARY_COLOR};
        border-radius: 5px;
      }

      * {
        box-sizing: border-box;
      }
    `}
  />
);

export default GlobalStyle;

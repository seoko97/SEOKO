import React from 'react'
import reset from 'emotion-reset'
import { css, Global, ThemeProvider }  from '@emotion/react'

const GlobalStyle = () => (
  <Global
    styles={css`
      ${reset}

      html, body, #__next {
        height: 100%;
      }
      html,
      body {
        overflow-x: hidden;
        width: 100%;
        height: 100%;
      }
      body {
        overflow-y: overlay;
        margin: 0;
        font-size: 14px;
        line-height: 1.5715;
        user-select: none;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 0;
        margin-bottom: 0.5em;
      }
      a {
        text-decoration: none;
        outline: none;
      }
      & * {
        font-family: "Noto Sans KR", sans-serif !important;
      }
    `}
  />
);

// storybook 실행시 적용되는 스타일
export const decorater = [
  (Story) => (
    // <ThemeProvider theme={lightTheme}>
    <>
      <Story />
      <GlobalStyle />
    </>
    // </ThemeProvider>
  ),
];


export const parameters = {
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#ffffff",
      },
      {
        name: "dark",
        value: "#333333",
      },
    ],
  },
};
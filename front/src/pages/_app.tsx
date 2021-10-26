import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@emotion/react";
import DarkModeButton from "@molecules/DarkModeButton";

import GlobalStyle from "@theme/GlobalStyle";
import { darkTheme, lightTheme } from "@theme/.";
import { useCookies } from "react-cookie";
import cookieParser from "@src/lib/cookieParser";

interface Props extends AppProps {
  mode: string;
}

const SEOKO = ({ Component, pageProps, mode: modeInCookie }: Props) => {
  const [cookies, setCookies] = useCookies(["mode"]);
  const mode = useMemo(() => cookies.mode || modeInCookie, [cookies.mode, modeInCookie]);

  useEffect(() => {
    if (!cookies.mode) setCookies("mode", "light");
  }, []);

  const onClickDarkMode = useCallback(() => {
    setCookies("mode", mode === "light" ? "dark" : "light");
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <RecoilRoot>
          <GlobalStyle theme={mode === "light" ? lightTheme : darkTheme} />
          <Component {...pageProps} />
          <DarkModeButton mode={mode} onClick={onClickDarkMode} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

SEOKO.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = cookieParser(ctx.req?.headers?.cookie);

  return { mode: cookies.mode || "light" };
};

export default SEOKO;

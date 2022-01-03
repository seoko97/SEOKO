import React, { useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import Head from "next/head";
import { AppContext, AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";

import cookieParser from "@lib/cookieParser";
import AppLayout from "@frames/AppLayout";
import DarkModeButton from "@molecules/DarkModeButton";

import { darkTheme, lightTheme } from "@theme/.";
import GlobalStyle from "@theme/GlobalStyle";
import { initatialSigninCheck } from "@apis/users";
import { allAtoms, initializeRecoilState } from "@states/.";

interface Props extends AppProps {
  mode: string;
  initialRecoilState: typeof allAtoms;
}

const SEOKO = ({ Component, pageProps, mode: modeInCookie, initialRecoilState = {} }: Props) => {
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
      <Head>
        <title>SEOKO</title>
      </Head>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <RecoilRoot initializeState={initializeRecoilState(initialRecoilState)}>
          <GlobalStyle theme={mode === "light" ? lightTheme : darkTheme} />
          <AppLayout>
            <Component {...pageProps} />
            <DarkModeButton mode={mode} onClick={onClickDarkMode} />
          </AppLayout>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

SEOKO.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = ctx.req?.headers?.cookie;
  const { mode } = cookieParser(cookies);

  if (ctx.req && cookies) axios.defaults.headers.common.cookie = cookies;
  const user = await initatialSigninCheck();
  const initialRecoilState = {
    user,
  };
  console.log("@@@@", user);

  return { mode: mode || "light", initialRecoilState };
};

export default SEOKO;

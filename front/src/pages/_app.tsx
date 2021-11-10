import React, { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import { AppContext, AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";
import cookieParser from "@src/lib/cookieParser";
import AppLayout from "@frames/AppLayout";
import DarkModeButton from "@molecules/DarkModeButton";

import { darkTheme, lightTheme } from "@theme/.";
import GlobalStyle from "@theme/GlobalStyle";
import { initatialSigninCheck } from "@src/apis/users";

interface Props extends AppProps {
  mode: string;
}

const SEOKO = ({ Component, pageProps, mode: modeInCookie }: Props) => {
  const [cookies, setCookies] = useCookies(["mode"]);
  const mode = useMemo(() => cookies.mode || modeInCookie, [cookies.mode, modeInCookie]);

  useEffect(() => {
    if (!cookies.mode) setCookies("mode", "light");
    initatialSigninCheck()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
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
        <RecoilRoot>
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
  const cookies = cookieParser(ctx.req?.headers?.cookie);

  return { mode: cookies.mode || "light" };
};

export default SEOKO;

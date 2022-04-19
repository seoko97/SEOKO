import React, { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import { AppContext, AppProps } from "next/app";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";

import cookieParser from "@lib/cookieParser";
import { useApollo } from "@lib/apllo";
import signinCheck from "@lib/signinCheck";

import AppLayout from "@frames/AppLayout";
import DarkModeButton from "@molecules/DarkModeButton";
import { ApolloProvider } from "@apollo/client";

import { darkTheme, lightTheme } from "@theme/.";
import GlobalStyle from "@theme/GlobalStyle";

interface Props extends AppProps {
  mode: string;
  user: string | null;
}

const SEOKO = ({ Component, pageProps, mode: modeInCookie }: Props) => {
  const [cookies, setCookies] = useCookies(["mode"]);
  const mode = useMemo(() => cookies.mode || modeInCookie, [cookies.mode, modeInCookie]);
  const client = useApollo();
  useEffect(() => {
    if (!cookies.mode) setCookies("mode", "light");
    signinCheck();
  }, []);

  const onClickDarkMode = useCallback(() => {
    setCookies("mode", mode === "light" ? "dark" : "light");
  }, [mode]);

  const checkMode = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <>
      <Head>
        <title>SEOKO</title>
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={checkMode}>
          <GlobalStyle theme={checkMode} />
          <AppLayout>
            <Component {...pageProps} />
            <DarkModeButton mode={mode} onClick={onClickDarkMode} />
          </AppLayout>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

SEOKO.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = ctx.req?.headers?.cookie;
  const { mode } = cookieParser(cookies);

  return { mode: mode || "light" };
};

export default SEOKO;

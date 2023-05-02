import React, { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import { AppContext, AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";

import cookieParser from "@lib/cookieParser";
import { useApollo } from "@lib/apollo/useApollo";
import initializeSigninCheck from "@lib/initializeSigninCheck";
import useGtagHandler from "@hooks/useGtagHandler";

import AppLayout from "@frames/AppLayout";
import DarkModeButton from "@molecules/DarkModeButton";
import Analytics from "@components/Analytics";

import { darkTheme, lightTheme } from "@theme/.";
import GlobalStyle from "@theme/GlobalStyle";

interface IPageProps extends AppProps {
  mode: string;
}

const SEOKO = ({ Component, pageProps, mode: modeInCookie }: IPageProps) => {
  const [cookies, setCookies] = useCookies(["mode"]);
  const mode = useMemo(() => cookies.mode || modeInCookie, [cookies.mode, modeInCookie]);
  const client = useApollo(pageProps);

  const onClickDarkMode = useCallback(() => {
    setCookies("mode", mode === "light" ? "dark" : "light");
  }, [mode]);

  useEffect(() => {
    if (!cookies.mode) setCookies("mode", "light");
    initializeSigninCheck();
  }, []);

  useGtagHandler();

  const checkMode = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <>
      <Head>
        <title>SEOKO</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </Head>
      <Analytics />
      <ApolloProvider client={client}>
        <ThemeProvider theme={checkMode}>
          <GlobalStyle theme={checkMode} />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <DarkModeButton mode={mode} onClick={onClickDarkMode} />
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

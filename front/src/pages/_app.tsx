import React, { useCallback, useEffect, useMemo } from "react";
import Head from "next/head";
import { AppContext, AppProps } from "next/app";
import { useCookies } from "react-cookie";
import { ThemeProvider } from "@emotion/react";

import cookieParser from "@lib/cookieParser";
import { useApollo } from "@lib/apollo";

import AppLayout from "@frames/AppLayout";
import DarkModeButton from "@molecules/DarkModeButton";
import { ApolloProvider } from "@apollo/client";

import { darkTheme, lightTheme } from "@theme/.";
import GlobalStyle from "@theme/GlobalStyle";
import initializeSigninCheck from "@lib/initializeSigninCheck";

interface IPageProps extends AppProps {
  mode: string;
}

const SEOKO = ({ Component, pageProps, mode: modeInCookie }: IPageProps) => {
  const [cookies, setCookies] = useCookies(["mode"]);
  const mode = useMemo(() => cookies.mode || modeInCookie, [cookies.mode, modeInCookie]);
  const client = useApollo(pageProps);

  useEffect(() => {
    if (!cookies.mode) setCookies("mode", "light");
    initializeSigninCheck();
  }, []);

  const onClickDarkMode = useCallback(() => {
    setCookies("mode", mode === "light" ? "dark" : "light");
  }, [mode]);

  const checkMode = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <>
      <Head>
        <title>SEOKO</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="개발자를 목표로 공부하고 있는 지석호의 블로그, 포트폴리오 웹 페이지입니다."
        />
        <meta name="og:title" content="SEOKO" />
        <meta name="og:image" content="http://image.toast.com/aaaacgm/SEOKO.png" />
        <meta
          name="og:description"
          content="개발자를 목표로 공부하고 있는 지석호의 블로그, 포트폴리오 웹 페이지입니다."
        />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
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

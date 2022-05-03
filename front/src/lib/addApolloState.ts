import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AppProps } from "next/app";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"],
) => {
  if (pageProps?.props) pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

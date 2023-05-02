import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export interface IPageProps {
  props: {
    [key: string]: any;
  };
}

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: IPageProps,
) => {
  if (pageProps?.props) pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};

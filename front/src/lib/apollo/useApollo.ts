import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { APOLLO_STATE_PROP_NAME } from "@lib/apollo/addApolloState";
import { useMemo } from "react";
import { initializeClient } from "./apollo";

export const useApollo = (pageProps: any): ApolloClient<NormalizedCacheObject> => {
  const state = pageProps?.[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeClient({ initialState: state }), [state]);

  return store;
};

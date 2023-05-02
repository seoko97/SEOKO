import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import {
  ApolloClient,
  from,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GetServerSidePropsContext } from "next";
import { onError } from "@apollo/client/link/error";
import { REFRESH } from "@queries/users";
import { API_URL, isProd } from "@config/constance";
import { MEMORY_CACHE_OPTIONS } from "@lib/constants";

export interface IInitializeApollo {
  initialState?: NormalizedCacheObject | undefined;
  ctx?: GetServerSidePropsContext;
}

const TOKEN_EXPIRED = "jwt expired";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const enhancedFetch =
  (ctx?: GetServerSidePropsContext) => async (url: RequestInfo, init: RequestInit) => {
    const response = await fetch(url, init);

    const setCookies = response.headers.get("set-cookie");

    if (ctx && setCookies) ctx.res?.setHeader("set-Cookie", setCookies);

    return response;
  };

export const createApolloClient = ({ initialState, ctx }: IInitializeApollo) => {
  const cache = new InMemoryCache(MEMORY_CACHE_OPTIONS);

  const linkOnError = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors?.[0].message === TOKEN_EXPIRED) {
      const client = apolloClient ?? createClient;

      const refresh = fromPromise(
        client
          .mutate({
            mutation: REFRESH,
          })
          .then(({ data }) => data.refresh.ok),
      );

      return refresh.filter((result) => result).flatMap(() => forward(operation));
    }
  });

  const httpLink = createUploadLink({
    uri: `${API_URL}/graphql`,
    credentials: "include",
    headers: ctx?.req.headers,
    fetch: enhancedFetch(ctx),
  });

  const createClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: cache.restore(initialState ?? {}),
    link: from([linkOnError, httpLink]),
    connectToDevTools: !isProd,
    defaultOptions: {
      query: {
        errorPolicy: "all",
      },
    },
  });

  return createClient;
};

export const initializeClient = ({ initialState, ctx }: IInitializeApollo = {}) => {
  const _apolloClient = apolloClient ?? createApolloClient({ initialState, ctx });

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") {
    return _apolloClient;
  }
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

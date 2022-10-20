import { useMemo } from "react";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import {
  ApolloClient,
  from,
  fromPromise,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { AppProps } from "next/app";
import { GetServerSidePropsContext } from "next";
import { onError } from "@apollo/client/link/error";
import { REFRESH } from "@queries/users";
import { APOLLO_STATE_PROP_NAME } from "./addApolloState";
import { mergeItem } from "./mergeItem";

type InitialState = NormalizedCacheObject | undefined;

export interface IInitializeApollo {
  initialState?: InitialState;
  ctx?: GetServerSidePropsContext | null;
}

export const prod = process.env.NODE_ENV === "production";
const TOKEN_EXPIRED = "jwt expired";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const cachePolicy: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          keyArgs: ["input", ["lastId", "category", "tag"]],
          merge: mergeItem,
        },
        searchPosts: {
          keyArgs: ["input", ["text"]],
          merge: mergeItem,
        },
        getPostsByTag: {
          keyArgs: ["input", ["tagName"]],
          merge: mergeItem,
        },
        getTag: {
          keyArgs: ["input"],
        },
      },
    },
  },
};

export const createApolloClient = (ctx: GetServerSidePropsContext | null) => {
  const cookie = ctx?.req?.headers.cookie || "";
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    const token = ctx?.res?.getHeader("set-cookie") as string | undefined;

    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        cookie: token ?? cookie,
      },
    }).then((response) => {
      const setCookies = response.headers.get("set-cookie");
      if (ctx && setCookies) ctx.res?.setHeader("set-Cookie", setCookies);
      return response;
    });
  };

  const httpLink = createUploadLink({
    uri: prod ? process.env.API_URL : "http://localhost:3065/graphql",
    credentials: "include",
    fetch: enhancedFetch,
  });

  const linkOnError = onError(({ graphQLErrors, operation, networkError, forward }) => {
    if (graphQLErrors?.[0].message === TOKEN_EXPIRED) {
      const client = apolloClient ?? createClient;
      const refresh = fromPromise(
        client.mutate({ mutation: REFRESH }).then(({ data }) => data.refresh.ok),
      );

      return refresh.filter((result) => result).flatMap(() => forward(operation));
    }
  });

  const createClient = new ApolloClient({
    ssrMode: typeof window === undefined,
    cache: new InMemoryCache(cachePolicy),
    link: from([linkOnError, httpLink]),
    connectToDevTools: true,
    defaultOptions: {
      query: {
        errorPolicy: "all",
      },
    },
  });

  return createClient;
};

export const initializeClient = ({ initialState, ctx = null }: IInitializeApollo = {}) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

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
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (pageProps: AppProps["pageProps"]) => {
  const state = pageProps?.[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeClient({ initialState: state }), [state]);
  return store;
};
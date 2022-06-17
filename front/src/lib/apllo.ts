import { useMemo } from "react";
import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  InMemoryCacheConfig,
  NormalizedCacheObject,
} from "@apollo/client";
import { AppProps } from "next/app";
import { GetServerSidePropsContext } from "next";
import { onError } from "@apollo/client/link/error";
import { REFRESH } from "@queries/users";
import { APOLLO_STATE_PROP_NAME } from "./addApolloState";
import { cachePolicyByPost } from "./cachePolicyByPost";

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
        getPosts: cachePolicyByPost,
        searchPosts: cachePolicyByPost,
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

  const httpLink = new HttpLink({
    // uri: prod ? process.env.API_URL : "http://localhost:3065/graphql",
    uri: "http://localhost:3065/graphql",
    credentials: "include",
    fetch: enhancedFetch,
  });

  const linkOnError = onError(({ graphQLErrors, operation, forward }) => {
    console.log(graphQLErrors);
    if (graphQLErrors?.[0].message === TOKEN_EXPIRED) {
      const client = apolloClient ?? intializeClinet({ ctx });
      const refresh = fromPromise(
        client.mutate({ mutation: REFRESH }).then(({ data }) => data.refresh.ok),
      );

      return refresh.filter((result) => result).flatMap(() => forward(operation));
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === undefined,
    cache: new InMemoryCache(cachePolicy),
    link: from([linkOnError, httpLink]),
  });
};

export const intializeClinet = ({ initialState, ctx = null }: IInitializeApollo = {}) => {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // Next.js 에서 Apollo Client를 이용해 데이터를 가져오는 함수가 있다면 초기 상태값이 여기에 합쳐진다.
  if (initialState) {
    // 클라이언트에서 받은 데이터인 현재 캐시 데이터를 가져온다.
    const existingCache = _apolloClient.extract();

    // 현재 캐시와 SSR 메소드인 getStaticProps/getServerSideProps 로 부터 받은 데이터를 합친다.
    const data = Object.assign(initialState, existingCache);

    // 합쳐진 데이터를 저장한다.
    _apolloClient.cache.restore(data);
  }
  // SSG와 SSR은 항상 새로운 Apollo Client를 생성
  if (typeof window === "undefined") return _apolloClient;
  // 클라이언트의 Apollo Client는 한 번만 생성
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (pageProps: AppProps["pageProps"]) => {
  const state = pageProps?.[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => intializeClinet({ initialState: state }), [state]);
  return store;
};

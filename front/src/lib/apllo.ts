import { useMemo } from "react";
import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { IncomingHttpHeaders } from "http";
import { REFRESH } from "../queries/users";

type InitialState = NormalizedCacheObject | undefined;
type HttpHeaders = IncomingHttpHeaders | null;

interface IInitializeApollo {
  headers?: HttpHeaders;
  initialState?: InitialState;
}

export const prod = process.env.NODE_ENV === "production";
const TOKEN_EXPIRED = "jwt expired";

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        cookie: headers?.cookie ?? "",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => response);
  };

  const httpLink = new HttpLink({
    uri: prod ? process.env.API_URL : "http://localhost:3065/graphql",
    credentials: "include",
    fetch: enhancedFetch,
  });

  const linkOnError = onError(({ graphQLErrors, operation, forward, response, networkError }) => {
    if (!apolloClient) return;
    if (graphQLErrors?.[0].message === TOKEN_EXPIRED) {
      const client = apolloClient;
      const refresh = fromPromise(
        client.mutate({ mutation: REFRESH }).then(({ data }) => data.refresh.ok),
      );
      return refresh.filter((result) => result).flatMap(() => forward(operation));
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === undefined,
    cache: new InMemoryCache(),
    link: from([linkOnError, httpLink]),
  });
};

export const intializeClinet = ({ initialState, headers }: IInitializeApollo = {}) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

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

export const useApollo = (initialState: IInitializeApollo = {}) => {
  const store = useMemo(() => intializeClinet(initialState), [initialState]);
  return store;
};

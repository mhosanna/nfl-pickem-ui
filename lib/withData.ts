import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createHttpLink } from '@apollo/client/link/http';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { withApollo, InitApolloOptions } from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

function createClient({
  headers,
  initialState,
}: InitApolloOptions<NormalizedCacheObject>) {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response);
  };
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      createHttpLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          mode: 'cors',
        },
        credentials: 'include',
        fetch: enhancedFetch,
      }),
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });

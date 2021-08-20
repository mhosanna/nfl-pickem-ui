import { useMemo } from "react";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { ErrorHandler, onError } from "@apollo/client/link/error";
import { createHttpLink } from "@apollo/client/link/http";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { endpoint, prodEndpoint } from "../config";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  credentials:
    process.env.NODE_ENV === "development" ? "include" : "same-origin",
});

const handleGraphQLErrors: ErrorHandler = ({ graphQLErrors, networkError }) => {
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
};

const errorLink = onError(handleGraphQLErrors);

function createApolloClient(headers = null) {
  const enhancedFetch = (url, init) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        Cookie: headers?.cookie ?? "",
      },
    }).then((response) => response);
  };
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
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
        uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
        credentials:
          process.env.NODE_ENV === "development" ? "include" : "same-origin",
        fetch: enhancedFetch,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            //allProducts: paginationField(),
          },
        },
      },
    }),
  });
}

export const initializeApollo = ({ headers = null, initialState = null }) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  );
  return store;
}

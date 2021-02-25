import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { onError, ErrorHandler } from "@apollo/client/link/error";
import { createHttpLink } from "@apollo/client/link/http";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "next-with-apollo";
import { endpoint } from "../config";

const handleGraphQLErrors: ErrorHandler = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(
      `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
    );
  }
};

const errorLink = onError(handleGraphQLErrors);

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: "same-origin",
  fetch,
});

function createClient({ ctx, headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default withApollo(createClient as any);

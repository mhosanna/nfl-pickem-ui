import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { ErrorHandler, onError } from "@apollo/client/link/error";
import { createHttpLink } from "@apollo/client/link/http";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "next-with-apollo";
import { endpoint, prodEndpoint } from "../config";

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  credentials: "same-origin",
  fetch,
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

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            //allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });

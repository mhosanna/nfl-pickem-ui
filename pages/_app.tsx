import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Page from "../components/PageShell";
import { useApollo } from "../lib/withData";
import GlobalStyles from "../components/GlobalStyles/GlobalStyles";
import { SeasonProvider } from "../lib/seasonContext";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles />
      <SeasonProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </SeasonProvider>
    </ApolloProvider>
  );
}

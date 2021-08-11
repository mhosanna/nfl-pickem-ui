import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Page from "../components/PageShell";
import { useApollo } from "../lib/withData";
import GlobalStyles from "../components/GlobalStyles/GlobalStyles";
import { SeasonProvider } from "../lib/seasonContext";
import { ThemeProvider } from 'styled-components';
import { QUERIES } from "../constants";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={{ queries: QUERIES }}>
      <GlobalStyles />
      <SeasonProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </SeasonProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

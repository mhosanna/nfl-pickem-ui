import { ApolloProvider } from "@apollo/client";
import Page from "../components/PageShell";
import withData from "../lib/withData";
import GlobalStyles from "../components/GlobalStyles/GlobalStyles";
import { SeasonProvider } from "../lib/seasonContext";
import { ThemeProvider } from "styled-components";
import { QUERIES } from "../constants";

export default function App({ Component, pageProps, apollo }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={{ queries: QUERIES }}>
        <GlobalStyles />
        <SeasonProvider>
          <Page>{useLayout({ Component, pageProps })}</Page>
        </SeasonProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

function useLayout({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}


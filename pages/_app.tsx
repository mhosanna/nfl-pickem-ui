import { ApolloProvider } from "@apollo/client";
import Page from "../components/PageShell";
import GlobalStyles from "../components/GlobalStyles/GlobalStyles";
import { SeasonProvider } from "../lib/seasonContext";
import { ThemeProvider } from "styled-components";
import { QUERIES } from "../constants";
import withData from "../lib/withData";

function App({ Component, pageProps, apollo }) {
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={{ queries: QUERIES }}>
          <SeasonProvider>
            <Page>{useLayout({ Component, pageProps })}</Page>
          </SeasonProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

function useLayout({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default withData(App);

import { ApolloProvider } from "@apollo/client";
import Page from "../components/PageShell";
import withData from "../lib/withData";
import GlobalStyles from "../components/GlobalStyles/GlobalStyles";
import { SeasonProvider } from "../lib/seasonContext";
import { ThemeProvider } from "styled-components";
import { QUERIES } from "../constants";

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
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
export default withData(App);

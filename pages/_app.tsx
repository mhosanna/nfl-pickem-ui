import { ReactNode } from "react";
import type { AppProps, AppLayoutProps } from "next/app";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import Page from "../components/PageShell";
import GlobalStyles from "../components/GlobalStyles/GlobalStyles";
import { SeasonProvider } from "../lib/seasonContext";
import { ThemeProvider } from "styled-components";
import { myTheme } from "../constants";
import withData from "../lib/withData";

type ApolloProps = {
  apollo: ApolloClient<any>;
};
type ApolloAppProps = ApolloProps & AppLayoutProps & AppProps;

function App({ Component, pageProps, apollo }: ApolloAppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={myTheme}>
          <SeasonProvider>
            <Page>
              <>{getLayout(<Component {...pageProps} />)}</>
            </Page>
          </SeasonProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default withData(App);

import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import type { AppProps, AppContext } from "next/app";
import { NextPageContext } from "next";
import Page from "./components/PageShell";
import withData from "../lib/withData";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";

type ApolloProps = {
  apollo: ApolloClient<any>;
};
type ApolloAppProps = ApolloProps & AppProps;

function MyApp({ Component, pageProps, apollo }: ApolloAppProps) {
  return (
    <ApolloProvider client={apollo}>
      <GlobalStyles />
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

type MyAppProps = AppContext & NextPageContext;

MyApp.getInitialProps = async function ({ Component, ctx }: MyAppProps) {
  let pageProps: { query?: NextPageContext["query"] } = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);

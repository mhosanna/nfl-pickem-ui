import type { AppProps, AppContext } from "next/app";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import Page from "./components/Page";
import withData from "../lib/withData";

interface Props extends AppProps {
  apollo: ApolloClient<{}>;
}

function MyApp({ Component, pageProps, apollo }: Props) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default withData(MyApp);

import type { AppProps, AppContext } from "next/app";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import withData from "../lib/withData";
import "../styles/globals.css";

interface Props extends AppProps {
  apollo: ApolloClient<{}>;
}

function MyApp({ Component, pageProps, apollo }: Props) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withData(MyApp);

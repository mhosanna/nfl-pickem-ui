import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import Page from '../components/PageShell';
import GlobalStyles from '../components/GlobalStyles/GlobalStyles';
import { SeasonProvider } from '../lib/seasonContext';
import { ThemeProvider } from 'styled-components';
import { myTheme } from '../constants';
import withData from '../lib/withData';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type ApolloProps = {
  apollo: ApolloClient<any>;
};

type AppPropsWithLayoutAndApollo = AppProps &
  ApolloProps & {
    Component: NextPageWithLayout;
  };

function App({ Component, pageProps, apollo }: AppPropsWithLayoutAndApollo) {
  const getLayout = Component.getLayout ?? ((page) => page);
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

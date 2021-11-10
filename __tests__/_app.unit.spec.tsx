import { render, screen } from '../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import AppPage from '../pages/_app';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

const props = {
  Component: () => null,
  pageProps: {},
};

it('tells you where you are', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <AppPage {...props} />
    </MockedProvider>
  );
  expect(screen.getByText('Pick’em')).toBeInTheDocument();
});

it('displays layout if component contains layout property', () => {
  const getLayout = function getLayout(page) {
    return <div data-testid="layout-wrapper">{page}</div>;
  };
  const componentWithLayout = () => null;
  componentWithLayout.getLayout = getLayout;
  const props = {
    Component: componentWithLayout,
    pageProps: {},
  };
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <AppPage {...props} />
    </MockedProvider>
  );
  expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
});

import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { useRouter } from 'next/router';
import { render, screen, waitFor } from '../utils/testUtil';
import ManageGamesPage, {
  GET_WEEK_BY_SLUG_QUERY,
} from '../pages/manage-games/[season]/[week]/index';
import { CURRENT_PLAYER_QUERY } from '../lib/usePlayer';
import { fakePlayer, fakeWeek } from '../utils/testData';

const week = fakeWeek();

const weeksMock = [
  {
    request: {
      query: GET_WEEK_BY_SLUG_QUERY,
      variables: { season: '2021', slug: 'week-1' },
    },
    result: {
      data: { weeks: [week] },
    },
  },
];

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  query: { season: '2021', week: 'week-1' },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={weeksMock} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Manage Games')).toBeInTheDocument();
  });
});
it('displays loading message if data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
it('displays error if weeks array is empty', async () => {
  const weeksMockNoWeeks = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season: '2021', slug: 'week-1' },
      },
      result: {
        data: { weeks: [] },
      },
    },
  ];
  render(
    <MockedProvider mocks={weeksMockNoWeeks} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
it('displays error if network error returned from backend', async () => {
  const weeksMockNetworkError = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season: '2021', slug: 'week-1' },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={weeksMockNetworkError} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
it('displays error if graphql error returned from database', async () => {
  const weeksMockGraphqlError = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season: '2021', slug: 'week-1' },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={weeksMockGraphqlError} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
it('displays login form if player is not logged in', async () => {
  render(
    <MockedProvider mocks={weeksMock} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    const signInHeading = screen.getAllByRole('heading', { level: 2 })[0];
    expect(signInHeading).toHaveTextContent('Sign Into Your Account');

    const resetHeading = screen.getAllByRole('heading', { level: 2 })[1];
    expect(resetHeading).toHaveTextContent('Request a Password Reset');
  });
});
it('displays page if player is logged in', async () => {
  const weeksMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season: '2021', slug: 'week-1' },
      },
      result: {
        data: { weeks: [week] },
      },
    },
    {
      request: { query: CURRENT_PLAYER_QUERY },
      result: { data: { authenticatedItem: fakePlayer() } },
    },
  ];
  render(
    <MockedProvider mocks={weeksMock} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Add New Game')).toBeInTheDocument();
  });
});

import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import { GraphQLError } from 'graphql';
import { render, screen, waitFor } from '../utils/testUtil';
import {
  ManageGamePage,
  GET_GAME_BY_SLUG_QUERY,
} from '../pages/manage-games/[season]/[week]/[game]/index';
import { GET_WEEK_BY_SLUG_QUERY } from '../pages/manage-games/[season]/[week]/index';
import { CURRENT_PLAYER_QUERY } from '../lib/usePlayer';
import { fakePlayer, fakeWeek, fakeGame } from '../utils/testData';

const season = '2021';
const weekSlug = 'week-1';
const gameSlug = 'falcons-jaguars';

const week = fakeWeek();
const game = fakeGame();

const gamesMock = [
  {
    request: {
      query: GET_WEEK_BY_SLUG_QUERY,
      variables: { season, slug: weekSlug },
    },
    result: {
      data: { weeks: [week] },
    },
  },
  {
    request: {
      query: GET_GAME_BY_SLUG_QUERY,
      variables: { season, slug: gameSlug },
    },
    result: {
      data: { games: [game] },
    },
  },
];

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  query: { season, week: weekSlug, game: gameSlug },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Manage Games')).toBeInTheDocument();
  });
});
it('displays loading message if weeks data not yet returned', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        data: { games: [game] },
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('displays loading message if game data not yet returned', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        data: { weeks: [week] },
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
it('displays error if weeks array is empty', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        data: { weeks: [] },
      },
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        data: { games: [game] },
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/week not found/i)).toBeInTheDocument();
  });
});

it('displays error if game data is empty', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        data: { weeks: [week] },
      },
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        data: { games: [] },
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/game not found/i)).toBeInTheDocument();
  });
});
it('displays error if network error returned from get weeks', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      error: new Error('[Network error]: An error occurred'),
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        data: { games: [game] },
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returned from get weeks', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        data: { games: [game] },
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays error if network error returned from get game', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        data: { weeks: [week] },
      },
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returned from get game', async () => {
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        data: { weeks: [week] },
      },
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays login form if player is not logged in', async () => {
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
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
  const gamesMock = [
    {
      request: {
        query: GET_WEEK_BY_SLUG_QUERY,
        variables: { season, slug: weekSlug },
      },
      result: {
        data: { weeks: [week] },
      },
    },
    {
      request: {
        query: GET_GAME_BY_SLUG_QUERY,
        variables: { season, slug: gameSlug },
      },
      result: {
        data: { games: [game] },
      },
    },
    {
      request: { query: CURRENT_PLAYER_QUERY },
      result: { data: { authenticatedItem: fakePlayer() } },
    },
  ];

  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Falcons vs Jaguars')).toBeInTheDocument();
  });
});

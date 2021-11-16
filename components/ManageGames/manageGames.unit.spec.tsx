import { useRouter } from 'next/router';
import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '../../utils/testUtil';
import { fakeGame } from '../../utils/testData';
import { GET_GAMES_BY_WEEK_SLUG } from '../GameTiles';

import ManageGames from '.';

const season = '2021';
const weekSlug = 'week-1';

const game = fakeGame();

const gamesMock = [
  {
    request: {
      query: GET_GAMES_BY_WEEK_SLUG,
      variables: { season, slug: weekSlug },
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
let mockRouter;
beforeEach(() => {
  mockRouter = {
    query: { week: 'week-1' },
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

it('tells you where you are', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  expect(screen.getByText('Add New Game')).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('displays network error if error loading games', async () => {
  const gamesMockWithNetworkError = [
    {
      request: {
        query: GET_GAMES_BY_WEEK_SLUG,
        variables: { season, slug: weekSlug },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={gamesMockWithNetworkError} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText('[Network error]: An error occurred')
    ).toBeInTheDocument();
  });
});

it('displays graphql error if error loading games', async () => {
  const gamesMockWithGraphqlError = [
    {
      request: {
        query: GET_GAMES_BY_WEEK_SLUG,
        variables: { season, slug: weekSlug },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={gamesMockWithGraphqlError} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('[GraphQL error]: Error!')).toBeInTheDocument();
  });
});

it('displays tiles for each game in week', async () => {
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('ATL')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByText('JAX')).toBeInTheDocument();
  });
});

it('routes user to manage game page when they click a game tile', async () => {
  const clickProps = {
    pathname: '/manage-games/[season]/[week]/[game]',
    query: { game: 'falcons-jaguars', season: '2021', week: 'week-1' },
  };

  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('ATL')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByText('JAX')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByRole('button', { name: 'edit game' }));
  expect(mockRouter.push).toHaveBeenCalledWith(clickProps);
});

it('opens modal when user clicks Add New Game', async () => {
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Add New Game' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Game')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new game form' })
    ).toBeInTheDocument();
  });
});

xit('creates new game when user fills out form and submits form', async () => {
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Add New Game' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Game')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new game form' })
    ).toBeInTheDocument();
  });
  const homeTeamInput = screen.getByRole('textbox', { name: 'Home Team' });
  fireEvent.change(homeTeamInput, { target: { value: 'Arizona Cardinals' } });
  expect(homeTeamInput.value).toBe('Arizona Cardinals');

  const awayTeamInput = screen.getByRole('textbox', { name: 'Away Team' });
  fireEvent.change(awayTeamInput, { target: { value: 'Baltimore Ravens' } });
  expect(awayTeamInput.value).toBe('Baltimore Ravens');

  const spreadInput = screen.getByRole('textbox', { name: 'Spread' });
  fireEvent.change(spreadInput, { target: { value: '13' } });
  expect(spreadInput.value).toBe('13');

  const createBtn = screen.getByRole('button', { name: 'Create Game' });
  await waitFor(() => {
    fireEvent.click(createBtn);
  });
  expect(screen.getByText('ARI')).toBeInTheDocument();
});

xit('displays an error when error creating new week', async () => {
  render(
    <MockedProvider mocks={gamesMock} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Add New Game' }));

  await waitFor(() => {
    expect(screen.getByText('Add a New Game')).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: 'add new game form' })
    ).toBeInTheDocument();
  });
  const homeTeamInput = screen.getByRole('textbox', { name: 'Home Team' });
  fireEvent.change(homeTeamInput, { target: { value: 'Arizona Cardinals' } });
  expect(homeTeamInput.value).toBe('Arizona Cardinals');

  const awayTeamInput = screen.getByRole('textbox', { name: 'Away Team' });
  fireEvent.change(awayTeamInput, { target: { value: 'Baltimore Ravens' } });
  expect(awayTeamInput.value).toBe('Baltimore Ravens');

  const spreadInput = screen.getByRole('textbox', { name: 'Spread' });
  fireEvent.change(spreadInput, { target: { value: '13' } });
  expect(spreadInput.value).toBe('13');

  const createBtn = screen.getByRole('button', { name: 'Create Game' });
  await waitFor(() => {
    fireEvent.click(createBtn);
  });
  expect(screen.getByText('Error')).toBeInTheDocument();
});

import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '../../utils/testUtil';
import { fakePlayer, fakeGame } from '../../utils/testData';
import { LeaderBoard, PLAYERS_QUERY, GAMES_PLAYED_QUERY } from '.';

const gameData = {
  games: [fakeGame()],
};

it('displays loading if data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );
  expect(screen.getByText('Loading...')).toBeVisible();
});

it('displays error if network error returning player data', async () => {
  const mocks = [
    {
      request: {
        query: PLAYERS_QUERY,
        variables: {
          season: '2021',
        },
      },
      error: new Error('An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

it('displays error if network error returning games data', async () => {
  const mocks = [
    {
      request: {
        query: GAMES_PLAYED_QUERY,
        variables: {
          season: '2021',
        },
      },
      error: new Error('An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

it('displays error if graphql error returning player data', async () => {
  const mocks = [
    {
      request: {
        query: PLAYERS_QUERY,
        variables: {
          season: '2021',
        },
      },
      result: {
        errors: [new GraphQLError('Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});

it('displays error if graphql error returning games data', async () => {
  const mocks = [
    {
      request: {
        query: GAMES_PLAYED_QUERY,
        variables: {
          season: '2021',
        },
      },
      result: {
        errors: [new GraphQLError('Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
it('displays players sorted by picks correct', async () => {
  const playerData = {
    players: [
      fakePlayer({ name: 'Bobby' }),
      fakePlayer({ name: 'Glen', picks: [{ id: '1', isCorrect: true }] }),
    ],
  };
  const mocks = [
    {
      request: {
        query: PLAYERS_QUERY,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: playerData,
      },
    },
    {
      request: {
        query: GAMES_PLAYED_QUERY,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: gameData,
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  const leaderRow = screen.getAllByRole('row')[1];
  const leaderName = leaderRow.getElementsByTagName('td')[1];
  expect(leaderName.textContent).toBe('Glen');

  const loserRow = screen.getAllByRole('row')[2];
  const loserName = loserRow.getElementsByTagName('td')[1];
  expect(loserName.textContent).toBe('Bobby');
});

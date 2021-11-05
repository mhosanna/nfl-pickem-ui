import { LeaderBoard } from '.';
import { render, screen, waitFor } from '../../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import {
  PlayersBySeasonDocument,
  GamesPlayedBySeasonDocument,
} from '../../types/generated-queries';
import { GraphQLError } from 'graphql';

it('displays loading if player data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  expect(screen.getByText('Loading...')).toBeVisible();
});
it('displays error if network error returning games data', async () => {
  const mocks = [
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      error: new Error('A games data error occurred'),
    },
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: { data: { players: [] } },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText('Error: A games data error occurred')
    ).toBeInTheDocument();
  });
});
it('displays error if network error returning player data', async () => {
  const mocks = [
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      error: new Error('A player data error occurred'),
    },
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: { data: { games: [] } },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText('Error: A player data error occurred')
    ).toBeInTheDocument();
  });
});
it('displays error if graphql error returning player data', async () => {
  const mocks = [
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        errors: [new GraphQLError('players gql error!')],
      },
    },
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: { data: { games: [] } },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Error: players gql error!')).toBeInTheDocument();
  });
});
it('displays error if graphql error returning games data', async () => {
  const mocks = [
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        errors: [new GraphQLError('games gql error!')],
      },
    },
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: { data: { players: [] } },
    },
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Error: games gql error!')).toBeInTheDocument();
  });
});
it('displays notice if there are no players in the league', async () => {
  const mocks = [
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: { players: null },
      },
    },
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          games: [
            {
              __typename: 'Game',
              id: '6',
            },
          ],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText("The season hasn't started yet. Check back soon!")
    ).toBeInTheDocument();
  });
});
it('displays notice if no games have been played yet', async () => {
  const mocks = [
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          players: [
            {
              __typename: 'Player',
              id: '1',
              name: 'Madeline',
              picks: [],
            },
          ],
        },
      },
    },
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          games: [],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LeaderBoard season="2021" />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText("The season hasn't started yet. Check back soon!")
    ).toBeInTheDocument();
  });
});
it('displays one player if only one player with picks in league', async () => {
  const mocks = [
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          players: [
            {
              __typename: 'Player',
              id: '1',
              name: 'Madeline',
              picks: [],
            },
            {
              __typename: 'Player',
              id: '2',
              name: 'Matt',
              picks: null,
            },
          ],
        },
      },
    },
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          games: [
            {
              __typename: 'Game',
              id: '6',
            },
          ],
        },
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
  expect(leaderName.textContent).toBe('Madeline');

  // const loserRow = screen.getAllByRole('row')[4];
  // const loserName = loserRow.getElementsByTagName('td')[1];
  // expect(loserName.textContent).toBe('Madeline');
});
it('displays players sorted by picks correct', async () => {
  const mocks = [
    {
      request: {
        query: PlayersBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          players: [
            {
              __typename: 'Player',
              id: '4',
              name: 'Mike',
              picks: [
                {
                  __typename: 'Pick',
                  id: '31',
                },
                {
                  __typename: 'Pick',
                  id: '32',
                },
                {
                  __typename: 'Pick',
                  id: '33',
                },
                {
                  __typename: 'Pick',
                  id: '34',
                },
              ],
            },
            {
              __typename: 'Player',
              id: '1',
              name: 'Madeline',
              picks: [],
            },
            {
              __typename: 'Player',
              id: '2',
              name: 'Matt',
              picks: [
                {
                  __typename: 'Pick',
                  id: '31',
                },
              ],
            },
            {
              __typename: 'Player',
              id: '3',
              name: 'Sue',
              picks: [
                {
                  __typename: 'Pick',
                  id: '31',
                },
                {
                  __typename: 'Pick',
                  id: '32',
                },
              ],
            },
          ],
        },
      },
    },
    {
      request: {
        query: GamesPlayedBySeasonDocument,
        variables: {
          season: '2021',
        },
      },
      result: {
        data: {
          games: [
            {
              __typename: 'Game',
              id: '6',
            },
          ],
        },
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
  expect(leaderName.textContent).toBe('Mike');

  const loserRow = screen.getAllByRole('row')[4];
  const loserName = loserRow.getElementsByTagName('td')[1];
  expect(loserName.textContent).toBe('Madeline');
});

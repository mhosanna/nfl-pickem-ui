import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { SIGNIN_MUTATION } from '../SignIn';
import { WEEKS_BY_SEASON_QUERY } from '../../lib/useWeekSelect';
import { render, screen, waitFor, fireEvent } from '../../utils/testUtil';
import { fakePlayer, fakeWeek, fakeGame, fakePick } from '../../utils/testData';
import { MAKE_PICK_MUTATION, Picks, PICKS_BY_WEEK_QUERY } from '.';

const email = 'email@example.com';
const password = 'password';
const season = '2021';
const player = fakePlayer({ id: '123' });
const weeks = [fakeWeek({ id: '123' })];
const game = fakeGame({ week: { id: '123' } });
const pick = fakePick({ id: '123', player, game });

const picksMockWithNoGames = [
  {
    request: {
      query: WEEKS_BY_SEASON_QUERY,
      variables: { season },
    },
    result: {
      data: { weeks },
    },
  },
];

const picksMockWithGames = [
  {
    request: {
      query: WEEKS_BY_SEASON_QUERY,
      variables: { season },
    },
    result: {
      data: {
        weeks: [fakeWeek({ id: '123', games: [game] })],
      },
    },
  },
  {
    request: {
      query: PICKS_BY_WEEK_QUERY,
      variables: { weekId: '123', playerId: '123' },
    },
    result: {
      data: {
        picks: [fakePick()],
      },
    },
  },
];

it('displays loading if weeks data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
it('displays error if network error returning week data', async () => {
  const picksMocksWithNetworkError = [
    {
      request: { query: SIGNIN_MUTATION, variables: { email, password } },
      error: new Error('An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={picksMocksWithNetworkError} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returning week data', async () => {
  const picksMocksWithGraphqlError = [
    {
      request: { query: SIGNIN_MUTATION, variables: { email, password } },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMocksWithGraphqlError} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays notice if no weeks in season', async () => {
  const picksMockWithNoWeeks = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [] },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMockWithNoWeeks} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText(/The season hasn't started yet./i)
    ).toBeInTheDocument();
  });
});
it('displays dropdown with weeks that exist in a season', async () => {
  render(
    <MockedProvider mocks={picksMockWithNoGames} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Week 1' })).toBeInTheDocument();
  });
});
it('displays no games found if week does not have any games', async () => {
  render(
    <MockedProvider mocks={picksMockWithNoGames} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Week 1' })).toBeInTheDocument();
    expect(screen.getByText('No Games Found')).toBeInTheDocument();
  });
});
it('displays list of games in the selected week', async () => {
  render(
    <MockedProvider mocks={picksMockWithGames} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Week 1' },
  });

  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Atlanta Falcons' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Jacksonville Jaguars' })
    ).toBeInTheDocument();
  });
});
it('adds a tag to the game winner', async () => {
  const picksMockWithGameWinner = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: {
          weeks: [
            fakeWeek({
              id: '123',
              games: [{ ...game, winner: game.homeTeam }],
            }),
          ],
        },
      },
    },
    {
      request: {
        query: PICKS_BY_WEEK_QUERY,
        variables: { weekId: '123', playerId: '123' },
      },
      result: {
        data: {
          picks: [fakePick()],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMockWithGameWinner} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Week 1' },
  });
  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Game Winner Atlanta Falcons' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Jacksonville Jaguars' })
    ).toBeInTheDocument();
  });
});
it('highlights the game after the player picks it', async () => {
  const picksMockWithGamesAndPick = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: {
          weeks: [fakeWeek({ id: '123', games: [game] })],
        },
      },
    },
    {
      request: {
        query: PICKS_BY_WEEK_QUERY,
        variables: { weekId: '123', playerId: '123' },
      },
      result: {
        data: {
          picks: [],
        },
      },
    },
    {
      request: {
        query: MAKE_PICK_MUTATION,
        variables: { player: '123', game: game.id, team: game.homeTeam.id },
      },
      result: {
        data: {
          upsertPicks: fakePick({ player, game, picked: game.homeTeam }),
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMockWithGamesAndPick} addTypename={true}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Week 1' },
  });
  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Atlanta Falcons' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('picked-team')).toBeNull();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Atlanta Falcons' }));
  await waitFor(() => {
    expect(screen.getByTestId('picked-team')).toBeInTheDocument();
  });
});

it('changes players pick if they pick new team', async () => {
  const picksMockWithGamesAndTwoPick = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: {
          weeks: [fakeWeek({ id: '123', games: [game] })],
        },
      },
    },
    {
      request: {
        query: PICKS_BY_WEEK_QUERY,
        variables: { weekId: '123', playerId: '123' },
      },
      result: {
        data: {
          picks: [],
        },
      },
    },
    {
      request: {
        query: MAKE_PICK_MUTATION,
        variables: { player: '123', game: game.id, team: game.homeTeam.id },
      },
      result: {
        data: {
          upsertPicks: { ...pick, picked: game.homeTeam },
        },
      },
    },
    {
      request: {
        query: MAKE_PICK_MUTATION,
        variables: { player: '123', game: game.id, team: game.awayTeam.id },
      },
      result: {
        data: {
          upsertPicks: { ...pick, picked: game.awayTeam },
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMockWithGamesAndTwoPick} addTypename={true}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Week 1' },
  });
  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Atlanta Falcons' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('picked-team')).toBeNull();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Atlanta Falcons' }));
  await waitFor(() => {
    const washingtonBtn = screen.getByRole('button', {
      name: 'Atlanta Falcons',
    });
    expect(washingtonBtn.firstChild).toHaveAttribute('data-testid');
  });
  fireEvent.click(screen.getByRole('button', { name: 'Jacksonville Jaguars' }));
  await waitFor(() => {
    const seattleBtn = screen.getByRole('button', {
      name: 'Jacksonville Jaguars',
    });
    expect(seattleBtn.firstChild).toHaveAttribute('data-testid');
  });
});

it('deletes pick if player re-clicks picked team', async () => {
  const picksMockMakePickDeletePick = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: {
          weeks: [fakeWeek({ id: '123', games: [game] })],
        },
      },
    },
    {
      request: {
        query: PICKS_BY_WEEK_QUERY,
        variables: { weekId: '123', playerId: '123' },
      },
      result: {
        data: {
          picks: [],
        },
      },
    },
    {
      request: {
        query: MAKE_PICK_MUTATION,
        variables: { player: '123', game: game.id, team: game.homeTeam.id },
      },
      result: {
        data: {
          upsertPicks: { ...pick, picked: game.homeTeam },
        },
      },
    },
    {
      request: {
        query: MAKE_PICK_MUTATION,
        variables: { player: '123', game: game.id, team: game.homeTeam.id },
      },
      result: {
        data: {
          upsertPicks: { ...pick, player: null, game: null, picked: null },
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMockMakePickDeletePick} addTypename={true}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Week 1' },
  });
  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Atlanta Falcons' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('picked-team')).toBeNull();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Atlanta Falcons' }));
  await waitFor(() => {
    const washingtonBtn = screen.getByRole('button', {
      name: 'Atlanta Falcons',
    });
    expect(washingtonBtn.firstChild).toHaveAttribute('data-testid');
  });
  fireEvent.click(screen.getByRole('button', { name: 'Atlanta Falcons' }));
  await waitFor(() => {
    expect(screen.queryByTestId('picked-team')).not.toBeInTheDocument();
  });
});

it('does not make pick if game has winner', async () => {
  const picksMockMakePickWithWinner = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: {
          weeks: [
            fakeWeek({
              id: '123',
              games: [{ ...game, winner: game.homeTeam }],
            }),
          ],
        },
      },
    },
    {
      request: {
        query: PICKS_BY_WEEK_QUERY,
        variables: { weekId: '123', playerId: '123' },
      },
      result: {
        data: {
          picks: [],
        },
      },
    },
    {
      request: {
        query: MAKE_PICK_MUTATION,
        variables: { player: '123', game: game.id, team: game.homeTeam.id },
      },
      result: {
        data: {
          upsertPicks: null,
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksMockMakePickWithWinner} addTypename={true}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'Week 1' },
  });
  await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Game Winner Atlanta Falcons' })
    ).toBeInTheDocument();
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Game Winner Atlanta Falcons' })
  );
  await waitFor(() => {
    expect(screen.queryByTestId('picked-team')).not.toBeInTheDocument();
  });
});

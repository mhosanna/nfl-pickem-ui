import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '../../utils/testUtil';
import { fakeGame, fakePick, fakePlayer, fakeWeek } from '../../utils/testData';
import { WEEKS_BY_SEASON_QUERY } from '../../lib/useWeekSelect';
import PicksByPlayer, { PLAYERS_QUERY } from '.';

const season = '2021';

const game = fakeGame({ week: { id: '123' } });
const weeks = fakeWeek({ games: [game], gamesCount: 1 });
const pick = fakePick({ player: null, game, picked: game.homeTeam });
const player = fakePlayer({ name: 'Glen', picks: [pick] });

const defaultProps = {
  season,
};

it('displays loading if player data not yet returned', async () => {
  const picksByPlayerLoading = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByPlayerLoading} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

it('displays error if network error returning player data', async () => {
  const picksByPlayerMockNetworkError = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: PLAYERS_QUERY,
        variables: { season, weekId: weeks.id },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={picksByPlayerMockNetworkError} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText('[Network error]: An error occurred')
    ).toBeInTheDocument();
  });
});
it('displays error if graphql error returning player data', async () => {
  const picksByPlayerMockGraphqlError = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: PLAYERS_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByPlayerMockGraphqlError} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('[GraphQL error]: Error!')).toBeInTheDocument();
  });
});

xit('displays message if no players in season', async () => {
  const picksByPlayerMockNoPlayers = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: PLAYERS_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        data: {
          players: [],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByPlayerMockNoPlayers} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText("The season hasn't started yet. Check back soon!")
    ).toBeInTheDocument();
  });
});

it('displays players when data is returned', async () => {
  const picksByPlayerMock = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: PLAYERS_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        data: {
          players: [player],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByPlayerMock} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Glen')).toBeInTheDocument();
  });
});

it('displays pick data when player is selected', async () => {
  const picksByPlayerMock = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weeks] },
      },
    },
    {
      request: {
        query: PLAYERS_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        data: {
          players: [player],
        },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByPlayerMock} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Glen')).toBeInTheDocument();
  });
  const playerList = screen.getByRole('list', { name: 'players' });
  const { getAllByRole } = within(playerList);
  const players = getAllByRole('listitem');
  fireEvent.click(players[0]);
  await waitFor(() => {
    expect(screen.getByRole('list', { name: 'games' })).toBeInTheDocument();
    expect(screen.getByText('JAX')).toBeInTheDocument();
  });
});

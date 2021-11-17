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
import PicksByGame, { GAMES_QUERY } from '.';
import { PLAYERS_QUERY } from '../PicksByPlayer';

const season = '2021';

const game = fakeGame({ week: { id: '123' } });
const weeks = fakeWeek({ games: [game], gamesCount: 1 });
const pick = fakePick({ player: null, game, picked: game.homeTeam });
const player = fakePlayer({ picks: [pick] });

const defaultProps = {
  season,
};

xit('displays loading if game data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

xit('displays error if network error returning game data', async () => {
  const picksByGameMockNetworkError = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      error: new Error('[Network error]: An error occurred'),
    },
  ];
  render(
    <MockedProvider mocks={picksByGameMockNetworkError} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
  screen.debug();
});
xit('displays error if graphql error returning game data', async () => {
  const picksByGameMockGraphqlError = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        errors: [new GraphQLError('[GraphQL error]: Error!')],
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByGameMockGraphqlError} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});

xit('displays message if no games in week', async () => {
  const weekWithoutGames = fakeWeek();
  const picksByGameMockNoGames = [
    {
      request: {
        query: WEEKS_BY_SEASON_QUERY,
        variables: { season },
      },
      result: {
        data: { weeks: [weekWithoutGames] },
      },
    },
    {
      request: {
        query: GAMES_QUERY,
        variables: { season, weekId: weekWithoutGames.id },
      },
      result: {
        data: { games: [] },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByGameMockNoGames} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('No Games')).toBeInTheDocument();
  });
});

it('displays games when data is returned', async () => {
  const picksByGameMock = [
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
        query: GAMES_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        data: { games: [game] },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByGameMock} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/Jaguars/i)).toBeInTheDocument();
  });
});

it('displays player picks when game is selected', async () => {
  const picksByGameMockWithPlayer = [
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
        query: GAMES_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        data: { games: [game] },
      },
    },
    {
      request: {
        query: PLAYERS_QUERY,
        variables: { season, weekId: weeks.id },
      },
      result: {
        data: { players: [player] },
      },
    },
  ];
  render(
    <MockedProvider mocks={picksByGameMockWithPlayer} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/Jaguars/i)).toBeInTheDocument();
    expect(screen.getByText(/Falcons/i)).toBeInTheDocument();
  });
  const gamesList = screen.getByRole('list', { name: 'games' });
  const { getAllByRole } = within(gamesList);
  const games = getAllByRole('listitem');
  fireEvent.click(games[0]);
  await waitFor(() => {
    const playerList = screen.getByRole('list', { name: 'players' });
    const { getAllByRole } = within(playerList);
    const players = getAllByRole('listitem');
    expect(players.length).toEqual(1);
    expect(players[0]).toHaveTextContent('Falcons');
  });
});

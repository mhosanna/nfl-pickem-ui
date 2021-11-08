import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '../../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import {
  getGamesBySeasonAndWeek,
  getGamesBySeasonAndWeekGraphqlError,
  getGamesBySeasonAndWeekNetworkError,
  getGamesBySeasonAndWeekNoGames,
} from '../../__mocks__/getGamesBySeason';
import { getPlayersBySeasonAndWeek } from '../../__mocks__/getPlayersBySeason';
import { selectedWeek } from '../../__mocks__/selectedWeek';
import PicksByGame from '.';

const defaultProps = {
  season: '2021',
  selectedWeek,
};

it('displays loading if game data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

it('displays error if network error returning game data', async () => {
  const mocks = [getGamesBySeasonAndWeekNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returning game data', async () => {
  const mocks = [getGamesBySeasonAndWeekGraphqlError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});

it('displays message if no games in week', async () => {
  const mocks = [getGamesBySeasonAndWeekNoGames];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('No Games')).toBeInTheDocument();
  });
});

it('displays games when data is returned', async () => {
  const mocks = [getGamesBySeasonAndWeek];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/Cardinals/i)).toBeInTheDocument();
  });
});

it('displays player picks when game is selected', async () => {
  const mocks = [getGamesBySeasonAndWeek, getPlayersBySeasonAndWeek];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByGame {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/Cardinals/i)).toBeInTheDocument();
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
    expect(players.length).toEqual(2);
    expect(players[0]).toHaveTextContent('MadelineFalcons');
  });
});

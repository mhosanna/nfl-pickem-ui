import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '../../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import {
  getPlayersBySeasonAndWeek,
  getPlayersBySeasonAndWeekNetworkError,
  getPlayersBySeasonAndWeekGraphqlError,
  getPlayersBySeasonAndWeekNoPlayers,
} from '../../__mocks__/getPlayersBySeason';
import { selectedWeek } from '../../__mocks__/selectedWeek';
import PicksByPlayer from '.';

const defaultProps = {
  season: '2021',
  selectedWeek,
};

it('displays loading if player data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

it('displays error if network error returning player data', async () => {
  const mocks = [getPlayersBySeasonAndWeekNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returning player data', async () => {
  const mocks = [getPlayersBySeasonAndWeekGraphqlError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});

it('displays message if no players in season', async () => {
  const mocks = [getPlayersBySeasonAndWeekNoPlayers];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
  const mocks = [getPlayersBySeasonAndWeek];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/Madeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Matt/i)).toBeInTheDocument();
  });
});

it('displays pick data when player is selected', async () => {
  const mocks = [getPlayersBySeasonAndWeek];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksByPlayer {...defaultProps} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/Madeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Matt/i)).toBeInTheDocument();
  });
  const playerList = screen.getByRole('list', { name: 'players' });
  const { getAllByRole } = within(playerList);
  const players = getAllByRole('listitem');
  fireEvent.click(players[0]);
  await waitFor(() => {
    expect(screen.getByRole('list', { name: 'games' })).toBeInTheDocument();
    expect(screen.getByTestId('correct-pick')).toBeInTheDocument();
    expect(screen.getByTestId('incorrect-pick')).toBeInTheDocument();
  });
});

import { Picks } from '.';
import { render, screen, waitFor, fireEvent } from '../../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import { getPicksByWeekEmpty } from '../../__mocks__/getPicksByWeek';
import {
  getWeeksBySeason,
  getWeeksBySeasonNoWeeks,
  getWeeksBySeasonNetworkError,
  getWeeksBySeasonGraphqlError,
} from '../../__mocks__/getWeeksBySeason';
import {
  makeWashingtonPick,
  makeSeattlePick,
  deletePick,
  pickGameWithWinner,
} from '../../__mocks__/makePick';

const player = {
  __typename: 'Player' as 'Player' | undefined,
  id: '2',
  email: 'matt@example.com',
  name: 'Matt',
};

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
  const mocks = [getWeeksBySeasonNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returning week data', async () => {
  const mocks = [getWeeksBySeasonGraphqlError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays notice if no weeks in season', async () => {
  const mocks = [getWeeksBySeasonNoWeeks];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
  const mocks = [getWeeksBySeason];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Week 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Week 8' })).toBeInTheDocument();
  });
});
it('displays no games found if week does not have any games', async () => {
  const mocks = [getWeeksBySeason];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Picks player={player} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Week 8' })).toBeInTheDocument();
    expect(screen.getByText('No Games Found')).toBeInTheDocument();
  });
});
it('displays list of games in the selected week', async () => {
  const mocks = [getWeeksBySeason, getPicksByWeekEmpty];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
      screen.getByRole('button', { name: 'Seattle Seahawks' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Washington Football Team' })
    ).toBeInTheDocument();
  });
});
it('adds a tag to the game winner', async () => {
  const mocks = [getWeeksBySeason, getPicksByWeekEmpty];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
      screen.getByRole('button', { name: 'Game Winner New England Patriots' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'New Orleans Saints' })
    ).toBeInTheDocument();
  });
});
it('highlights the game after the player picks it', async () => {
  const mocks = [getWeeksBySeason, getPicksByWeekEmpty, makeWashingtonPick];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
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
      screen.getByRole('button', { name: 'Washington Football Team' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('picked-team')).toBeNull();
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Washington Football Team' })
  );
  await waitFor(() => {
    expect(screen.getByTestId('picked-team')).toBeInTheDocument();
  });
});

it('changes players pick if they pick new team', async () => {
  const mocks = [
    getWeeksBySeason,
    getPicksByWeekEmpty,
    makeWashingtonPick,
    makeSeattlePick,
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
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
      screen.getByRole('button', { name: 'Washington Football Team' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('picked-team')).toBeNull();
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Washington Football Team' })
  );
  await waitFor(() => {
    const washingtonBtn = screen.getByRole('button', {
      name: 'Washington Football Team',
    });
    expect(washingtonBtn.firstChild).toHaveAttribute('data-testid');
  });
  fireEvent.click(screen.getByRole('button', { name: 'Seattle Seahawks' }));
  await waitFor(() => {
    const seattleBtn = screen.getByRole('button', {
      name: 'Seattle Seahawks',
    });
    expect(seattleBtn.firstChild).toHaveAttribute('data-testid');
  });
});

it('deletes pick if player re-clicks picked team', async () => {
  const mocks = [
    getWeeksBySeason,
    getPicksByWeekEmpty,
    makeWashingtonPick,
    deletePick,
  ];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
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
      screen.getByRole('button', { name: 'Washington Football Team' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('picked-team')).toBeNull();
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Washington Football Team' })
  );
  await waitFor(() => {
    const washingtonBtn = screen.getByRole('button', {
      name: 'Washington Football Team',
    });
    expect(washingtonBtn.firstChild).toHaveAttribute('data-testid');
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Washington Football Team' })
  );
  await waitFor(() => {
    expect(screen.queryByTestId('picked-team')).not.toBeInTheDocument();
  });
});

it('does not make pick if game has winner', async () => {
  const mocks = [getWeeksBySeason, getPicksByWeekEmpty, pickGameWithWinner];
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
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
      screen.getByRole('button', { name: 'Game Winner New England Patriots' })
    ).toBeInTheDocument();
  });
  fireEvent.click(
    screen.getByRole('button', { name: 'Game Winner New England Patriots' })
  );
  await waitFor(() => {
    expect(screen.queryByTestId('picked-team')).not.toBeInTheDocument();
  });
});

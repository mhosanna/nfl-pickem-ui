import { useRouter } from 'next/router';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor, fireEvent } from '../../utils/testUtils';
import {
  getGameBySlug,
  getGameBySlugNetworkError,
  getGameBySlugGraphqlError,
} from '../../__mocks__/getGameByWeekSlug';
import { createGame, createGameNetworkError } from '../../__mocks__/createGame';

import ManageGames from '.';

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

it('displays network error if error loading weeks', async () => {
  const mocks = [getGameBySlugNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText('[Network error]: An error occurred')
    ).toBeInTheDocument();
  });
});

it('displays graphql error if error loading weeks', async () => {
  const mocks = [getGameBySlugGraphqlError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('[GraphQL error]: Error!')).toBeInTheDocument();
  });
});

it('displays tiles for each game in week', async () => {
  const mocks = [getGameBySlug];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('ATL')).toBeInTheDocument();
    expect(screen.getByText('+12')).toBeInTheDocument();
    expect(screen.getByText('JAX')).toBeInTheDocument();
  });
});

it('routes user to manage game page when they click a game tile', async () => {
  const clickProps = {
    pathname: '/manage-games/[season]/[week]/[game]',
    query: { game: 'falcons-jaguars', season: '2021', week: 'week-1' },
  };

  const mocks = [getGameBySlug];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageGames weekId="1" season="2021" />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('ATL')).toBeInTheDocument();
    expect(screen.getByText('+12')).toBeInTheDocument();
    expect(screen.getByText('JAX')).toBeInTheDocument();
  });
  fireEvent.click(screen.getByRole('button', { name: 'edit game' }));
  expect(mockRouter.push).toHaveBeenCalledWith(clickProps);
});

it('opens modal when user clicks Add New Game', async () => {
  const mocks = [getGameBySlug];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
  const mocks = [getGameBySlug, createGame];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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
  const mocks = [getGameBySlug, createGameNetworkError];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
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

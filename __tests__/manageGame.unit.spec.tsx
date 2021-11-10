import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import { render, screen, waitFor } from '../utils/testUtils';
import ManageGamePage from '../pages/manage-games/[season]/[week]/[game]/index';
import { getCurrentPlayer } from '../__mocks__/getCurrentPlayer';
import {
  getGameBySlug,
  getGameBySlugNoGame,
  getGameBySeasonNetworkError,
  getGameBySeasonGraphqlError,
} from '../__mocks__/getGameBySlug';
import {
  getWeeksBySlug,
  getWeeksBySlugNoWeeks,
  getWeeksBySeasonNetworkError,
  getWeeksBySeasonGraphqlError,
} from '../__mocks__/getWeeksBySlug';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const mockRouter = {
  query: { season: '2021', week: 'week-1', game: 'falcons-jaguars' },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySlug, getGameBySlug]} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Manage Games')).toBeInTheDocument();
  });
});
it('displays loading message if weeks data not yet returned', async () => {
  render(
    <MockedProvider mocks={[getGameBySlug]} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('displays loading message if game data not yet returned', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySlug]} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
it('displays error if weeks array is empty', async () => {
  render(
    <MockedProvider
      mocks={[getWeeksBySlugNoWeeks, getGameBySlug]}
      addTypename={false}
    >
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/week not found/i)).toBeInTheDocument();
  });
});

it('displays error if game data is empty', async () => {
  render(
    <MockedProvider
      mocks={[getWeeksBySlug, getGameBySlugNoGame]}
      addTypename={false}
    >
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/game not found/i)).toBeInTheDocument();
  });
});
it('displays error if network error returned from get weeks', async () => {
  render(
    <MockedProvider
      mocks={[getWeeksBySeasonNetworkError, getGameBySlug]}
      addTypename={false}
    >
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returned from get weeks', async () => {
  render(
    <MockedProvider
      mocks={[getWeeksBySeasonGraphqlError, getGameBySlug]}
      addTypename={false}
    >
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays error if network error returned from get game', async () => {
  render(
    <MockedProvider
      mocks={[getGameBySeasonNetworkError, getWeeksBySlug]}
      addTypename={false}
    >
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returned from get game', async () => {
  render(
    <MockedProvider
      mocks={[getGameBySeasonGraphqlError, getWeeksBySlug]}
      addTypename={false}
    >
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays login form if player is not logged in', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySlug, getGameBySlug]} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    const signInHeading = screen.getAllByRole('heading', { level: 2 })[0];
    expect(signInHeading).toHaveTextContent('Sign Into Your Account');

    const resetHeading = screen.getAllByRole('heading', { level: 2 })[1];
    expect(resetHeading).toHaveTextContent('Request a Password Reset');
  });
});
it('displays page if player is logged in', async () => {
  const mocks = [getWeeksBySlug, getGameBySlug, getCurrentPlayer];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageGamePage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Falcons vs Jaguars')).toBeInTheDocument();
  });
});

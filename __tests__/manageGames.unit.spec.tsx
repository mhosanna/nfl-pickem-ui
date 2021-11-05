import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import { render, screen, waitFor } from '../utils/testUtils';
import ManageGamesPage from '../pages/manage-games/[season]/[week]/index';
import { getCurrentPlayer } from '../__mocks__/getCurrentPlayer';
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
  query: { season: '2021', week: 'week-1' },
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySlug]} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Manage Games')).toBeInTheDocument();
  });
});
it('displays loading message if data not yet returned', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
it('displays message if weeks array is empty', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySlugNoWeeks]} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('No weeks to display.')).toBeInTheDocument();
  });
});
it('displays error if network error returned from backend', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySeasonNetworkError]} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Network Error]/i)).toBeInTheDocument();
  });
});
it('displays error if graphql error returned from database', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySeasonGraphqlError]} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText(/[Graphql Error]/i)).toBeInTheDocument();
  });
});
it('displays login form if player is not logged in', async () => {
  render(
    <MockedProvider mocks={[getWeeksBySlug]} addTypename={false}>
      <ManageGamesPage />
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
  const mocks = [getWeeksBySlug, getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageGamesPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Add New Game')).toBeInTheDocument();
  });
});

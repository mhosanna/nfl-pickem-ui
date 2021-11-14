import { MockedProvider } from '@apollo/client/testing';
import { CURRENT_PLAYER_QUERY } from '../lib/usePlayer';
import { render, screen, waitFor } from '../utils/testUtil';
import { fakePlayer } from '../utils/testData';
import PicksPage from '../pages/picks';

const signedInMocks = [
  {
    request: { query: CURRENT_PLAYER_QUERY },
    result: { data: { authenticatedItem: fakePlayer() } },
  },
];

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Make Your Picks'
  );
});
it('displays login form if player is not logged in', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  const signInHeading = screen.getAllByRole('heading', { level: 2 })[0];
  expect(signInHeading).toHaveTextContent('Sign Into Your Account');

  const resetHeading = screen.getAllByRole('heading', { level: 2 })[1];
  expect(resetHeading).toHaveTextContent('Request a Password Reset');
});
it('displays page if player is logged in', async () => {
  render(
    <MockedProvider mocks={signedInMocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

import PicksPage from '../pages/picks';
import { getCurrentPlayer } from '../__mocks__/getCurrentPlayer';
import { render, screen, waitFor } from '../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';

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
  const mocks = [getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PicksPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '../utils/testUtil';
import { CURRENT_PLAYER_QUERY } from '../lib/usePlayer';
import { fakePlayer } from '../utils/testData';
import ManageWeeksPage from '../pages/manage-games/[season]/index';

const manageWeeksMocks = [
  {
    request: { query: CURRENT_PLAYER_QUERY },
    result: { data: { authenticatedItem: fakePlayer() } },
  },
];

it('tells you where you are', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ManageWeeksPage />
    </MockedProvider>
  );
  expect(screen.getByText('Manage Games')).toBeInTheDocument();
});
it('displays login form if player is not logged in', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ManageWeeksPage />
    </MockedProvider>
  );
  const signInHeading = screen.getAllByRole('heading', { level: 2 })[0];
  expect(signInHeading).toHaveTextContent('Sign Into Your Account');

  const resetHeading = screen.getAllByRole('heading', { level: 2 })[1];
  expect(resetHeading).toHaveTextContent('Request a Password Reset');
});
it('displays page if player is logged in', async () => {
  render(
    <MockedProvider mocks={manageWeeksMocks} addTypename={false}>
      <ManageWeeksPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Add New Week')).toBeInTheDocument();
  });
});

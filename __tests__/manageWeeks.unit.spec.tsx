import { render, screen, waitFor } from '../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import ManageWeeksPage from '../pages/manage-games/[season]/index';
import { getCurrentPlayer } from '../__mocks__/getCurrentPlayer';

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
  const mocks = [getCurrentPlayer];
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ManageWeeksPage />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

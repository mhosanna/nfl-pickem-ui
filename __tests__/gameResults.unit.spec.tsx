import { render, screen } from '../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import GameResultsPage from '../pages/game-results';

it('tells you where you are', () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <GameResultsPage />
    </MockedProvider>
  );
  expect(screen.getByText('Game Results')).toBeInTheDocument();
});

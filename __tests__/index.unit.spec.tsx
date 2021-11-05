import HomePage from '../pages/index';
import { render, screen } from '../utils/testUtils';
import { MockedProvider } from '@apollo/client/testing';

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );
  expect(screen.getByRole('heading')).toHaveTextContent('LeaderBoard');
});

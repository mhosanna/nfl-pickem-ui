import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '../utils/testUtil';
import HomePage from '../pages/index';

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <HomePage />
    </MockedProvider>
  );
  expect(screen.getByRole('heading')).toHaveTextContent('LeaderBoard');
});

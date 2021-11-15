import { render, screen } from '../utils/testUtil';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import ResetPage from '../pages/reset';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

it('tells you where you are', () => {
  const mockRouter = {
    query: { token: '12345' },
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ResetPage />
    </MockedProvider>
  );
  expect(
    screen.getByRole('heading', { level: 2, name: 'Reset Your Password' })
  ).toBeInTheDocument();
});

it('displays a message if no token provided', () => {
  const mockRouter = {
    query: {},
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ResetPage />
    </MockedProvider>
  );
  expect(screen.getByText('Sorry you must supply a token')).toBeInTheDocument();
});

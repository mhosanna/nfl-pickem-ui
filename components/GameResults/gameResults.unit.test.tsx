import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/router';
import { render, screen, waitFor } from '../../utils/testUtil';
import GameResults from '.';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

it('displays picks by player if router query is by=player', async () => {
  const mockRouter = {
    query: { by: 'player' },
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <GameResults season={'2021'} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByTestId('picks-by-player')).toBeInTheDocument();
  });
});

it('displays picks by game if router query is by=game', async () => {
  const mockRouter = {
    query: { by: 'game' },
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <GameResults season={'2021'} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(screen.getByTestId('picks-by-game')).toBeInTheDocument();
  });
});

it('displays error if query is not found', async () => {
  const mockRouter = {
    query: { by: 'nothingtoseehere' },
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <GameResults season={'2021'} />
    </MockedProvider>
  );
  await waitFor(() => {
    expect(
      screen.getByText("Oops! This page doesn't exist")
    ).toBeInTheDocument();
  });
});

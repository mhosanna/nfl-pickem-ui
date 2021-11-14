import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CURRENT_PLAYER_QUERY } from '../lib/usePlayer';
import { SIGNIN_MUTATION } from '../components/SignIn';
import { fakePlayer } from '../utils/testData';
import SignInPage from '../pages/signin';

const email = 'email@example.com';
const password = 'password';

const signedInMocks = [
  {
    request: { query: SIGNIN_MUTATION, variables: { email, password } },
    result: { data: { authenticatePlayerWithPassword: fakePlayer() } },
  },
  {
    request: { query: CURRENT_PLAYER_QUERY },
    result: { data: { authenticatedItem: fakePlayer() } },
  },
];

const signedInMocksWithNetworkError = [
  {
    request: { query: SIGNIN_MUTATION, variables: { email, password } },
    error: new Error('An error occurred'),
  },
  {
    request: { query: CURRENT_PLAYER_QUERY },
    result: { data: { authenticatedItem: fakePlayer() } },
  },
];

const signedInMocksWithBadPasswordError = [
  {
    request: { query: SIGNIN_MUTATION, variables: { email, password } },
    result: {
      data: {
        authenticatePlayerWithPassword: {
          code: 'FAILURE',
          message: 'Authentication failed.',
          __typename: 'PlayerAuthenticationWithPasswordFailure',
        },
        __typename: 'PlayerAuthenticationWithPasswordFailure',
      },
    },
  },
  {
    request: { query: CURRENT_PLAYER_QUERY },
    result: { data: { authenticatedItem: fakePlayer() } },
  },
];

it('tells you where you are', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <SignInPage />
    </MockedProvider>
  );
  expect(
    screen.getByRole('heading', { level: 2, name: 'Sign Into Your Account' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { level: 2, name: 'Request a Password Reset' })
  ).toBeInTheDocument();
});

it('does nothing if logged in successfully', async () => {
  render(
    <MockedProvider mocks={signedInMocks} addTypename={true}>
      <SignInPage />
    </MockedProvider>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  await waitFor(() => {
    expect(screen.getByLabelText('Email')).toHaveValue('email@example.com');
  });
  await waitFor(() => {
    expect(screen.getByLabelText('Password')).toHaveValue('password');
  });
  const signInButton = screen.getByRole('button', { name: 'Sign In' });

  fireEvent.click(signInButton);

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { level: 2, name: 'Sign Into Your Account' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Password')).toHaveValue('');
  });
});

it('displays an error if network error', async () => {
  //mock console error so it doesn't show during tes
  const networkError = console.error;
  console.error = jest.fn();

  render(
    <MockedProvider mocks={signedInMocksWithNetworkError} addTypename={true}>
      <SignInPage />
    </MockedProvider>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  const signInButton = screen.getByRole('button', { name: 'Sign In' });

  fireEvent.click(signInButton);
  await waitFor(() => {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
  console.error = networkError;
});

it('displays an error if bad username or password', async () => {
  render(
    <MockedProvider
      mocks={signedInMocksWithBadPasswordError}
      addTypename={true}
    >
      <SignInPage />
    </MockedProvider>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  const signInButton = screen.getByRole('button', { name: 'Sign In' });

  fireEvent.click(signInButton);
  await waitFor(() => {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Authentication failed.')).toBeInTheDocument();
  });
});

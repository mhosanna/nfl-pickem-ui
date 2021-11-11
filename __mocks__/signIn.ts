import { SIGNIN_MUTATION } from '../components/SignIn';

export const signInSuccess = {
  request: {
    query: SIGNIN_MUTATION,
    variables: { email: 'matt@example.com', password: 'password' },
  },
  result: {
    data: {
      authenticatePlayerWithPassword: {
        item: {
          id: '2',
          email: 'matt@example.com',
          name: 'Matt',
          __typename: 'Player',
        },
        __typename: 'PlayerAuthenticationWithPasswordSuccess',
      },
    },
  },
};

export const signInBadPassword = {
  request: {
    query: SIGNIN_MUTATION,
    variables: { email: 'matt@example.com', password: 'password' },
  },
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
};

export const signInNetworkError = {
  request: {
    query: SIGNIN_MUTATION,
    variables: { email: 'matt@example.com', password: 'password' },
  },
  error: new Error('An error occurred'),
};

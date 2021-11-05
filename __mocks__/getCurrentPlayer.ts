import { PlayerDocument } from '../types/generated-queries';

export const getCurrentPlayer = {
  request: {
    query: PlayerDocument,
  },
  result: {
    data: {
      authenticatedItem: {
        __typename: 'Player',
        id: '2',
        email: 'matt@example.com',
        name: 'Matt',
      },
    },
  },
};

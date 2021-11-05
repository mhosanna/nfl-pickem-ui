import { MakePickDocument } from '../types/generated-queries';

export const makePick = {
  request: {
    query: MakePickDocument,
    variables: { player: '2', game: '30', team: '32' },
  },
  result: {
    data: {
      upsertPicks: {
        id: '77',
        player: {
          id: '2',
          name: 'Matt',
          __typename: 'Player',
        },
        game: {
          id: '30',
          __typename: 'Game',
        },
        picked: {
          id: '32',
          name: 'Football Team',
          city: 'Washington',
          __typename: 'Team',
        },
        __typename: 'Pick',
      },
    },
  },
};

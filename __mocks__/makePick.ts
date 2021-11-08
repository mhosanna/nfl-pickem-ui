import { MakePickDocument } from '../types/generated-queries';

export const makeWashingtonPick = {
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

export const makeSeattlePick = {
  request: {
    query: MakePickDocument,
    variables: { player: '2', game: '30', team: '29' },
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
          id: '29',
          name: 'Seahawks',
          city: 'Seattle',
          __typename: 'Team',
        },
        __typename: 'Pick',
      },
    },
  },
};

export const deletePick = {
  request: {
    query: MakePickDocument,
    variables: { player: '2', game: '30', team: '32' },
  },
  result: {
    data: {
      upsertPicks: {
        id: '77',
        player: null,
        game: null,
        picked: null,
        __typename: 'Pick',
      },
    },
  },
};

export const pickGameWithWinner = {
  request: {
    query: MakePickDocument,
    variables: { player: '2', game: '6', team: '22' },
  },
  result: {
    data: {
      upsertPicks: null,
    },
  },
};

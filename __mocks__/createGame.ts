import { CreateGameDocument } from '../types/generated-queries';

export const createGame = {
  request: {
    query: CreateGameDocument,
    variables: {
      week: '18',
      slug: 'cardinals-ravens',
      season: '2021',
      homeTeamId: '1',
      awayTeam: '2',
      spread: 12,
    },
  },
  result: {
    data: {
      createGame: {
        __typename: 'Game',
        id: 'ckvs2rrfe18548sc0hwkib0aw8',
        slug: 'cardinals-ravens',
      },
    },
  },
};

export const createGameNetworkError = {
  request: {
    query: CreateGameDocument,
    variables: {
      week: '18',
      slug: 'cardinals-ravens',
      season: '2021',
      homeTeamId: '1',
      awayTeam: '2',
      spread: 12,
    },
  },
  error: new Error('An error occurred'),
};

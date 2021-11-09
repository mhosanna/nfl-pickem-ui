import { CreateWeekDocument } from '../types/generated-queries';

export const createWeek = {
  request: {
    query: CreateWeekDocument,
    variables: { label: 'Week 9', slug: 'week-9', season: '2021' },
  },
  result: {
    data: {
      createWeek: {
        __typename: 'Week',
        id: 'ckvs2rrfe18548sc0hwkib0aw8',
        label: 'Week 9',
        slug: 'week-9',
        season: '2021',
        gamesCount: 0,
        games: [],
      },
    },
  },
};

export const createWeekNetworkError = {
  request: {
    query: CreateWeekDocument,
    variables: { label: 'Week 9', slug: 'week-9', season: '2021' },
  },
  error: new Error('An error occurred'),
};

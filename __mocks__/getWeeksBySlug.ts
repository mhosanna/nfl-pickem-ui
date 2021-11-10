import { GetWeekBySlugDocument } from '../types/generated-queries';
import { GraphQLError } from 'graphql';

export const getWeeksBySlug = {
  request: {
    query: GetWeekBySlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  result: {
    data: {
      weeks: [
        {
          __typename: 'Week',
          id: '1',
          label: 'Week 1',
          games: [],
          gamesCount: 0,
          season: '2021',
          slug: 'week-1',
        },
      ],
    },
  },
};
export const getWeeksBySlugNoWeeks = {
  request: {
    query: GetWeekBySlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  result: {
    data: {
      weeks: [],
    },
  },
};

export const getWeeksBySeasonNetworkError = {
  request: {
    query: GetWeekBySlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  error: new Error('[Network error]: An error occurred'),
};

export const getWeeksBySeasonGraphqlError = {
  request: {
    query: GetWeekBySlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  result: {
    errors: [new GraphQLError('[GraphQL error]: Error!')],
  },
};

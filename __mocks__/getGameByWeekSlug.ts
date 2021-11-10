import { GetGamesByWeekSlugDocument } from '../types/generated-queries';
import { GraphQLError } from 'graphql';

export const getGameBySlug = {
  request: {
    query: GetGamesByWeekSlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  result: {
    data: {
      games: [
        {
          __typename: 'Game',
          id: '22',
          homeTeam: {
            __typename: 'Team',
            id: '2',
            name: 'Falcons',
            city: 'Atlanta',
            abbreviation: 'ATL',
          },
          awayTeam: {
            __typename: 'Team',
            id: '15',
            name: 'Jaguars',
            city: 'Jacksonville',
            abbreviation: 'JAX',
          },
          week: {
            __typename: 'Week',
            id: '18',
          },
          spread: 12,
          winner: null,
          slug: 'falcons-jaguars',
        },
      ],
    },
  },
};
export const getGameBySlugNoGame = {
  request: {
    query: GetGamesByWeekSlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  result: {
    data: {
      games: [],
    },
  },
};

export const getGameBySlugNetworkError = {
  request: {
    query: GetGamesByWeekSlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  error: new Error('[Network error]: An error occurred'),
};

export const getGameBySlugGraphqlError = {
  request: {
    query: GetGamesByWeekSlugDocument,
    variables: { season: '2021', slug: 'week-1' },
  },
  result: {
    errors: [new GraphQLError('[GraphQL error]: Error!')],
  },
};

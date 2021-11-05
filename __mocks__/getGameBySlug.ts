import { GetGameBySlugDocument } from '../types/generated-queries';
import { GraphQLError } from 'graphql';

export const getGameBySlug = {
  request: {
    query: GetGameBySlugDocument,
    variables: { season: '2021', slug: 'falcons-jaguars' },
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
    query: GetGameBySlugDocument,
    variables: { season: '2021', slug: 'falcons-jaguars' },
  },
  result: {
    data: {
      games: [],
    },
  },
};

export const getGameBySeasonNetworkError = {
  request: {
    query: GetGameBySlugDocument,
    variables: { season: '2021', slug: 'falcons-jaguars' },
  },
  error: new Error('[Network error]: An error occurred'),
};

export const getGameBySeasonGraphqlError = {
  request: {
    query: GetGameBySlugDocument,
    variables: { season: '2021', slug: 'falcons-jaguars' },
  },
  result: {
    errors: [new GraphQLError('[GraphQL error]: Error!')],
  },
};

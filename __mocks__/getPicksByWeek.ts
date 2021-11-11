import { PICKS_BY_WEEK_QUERY } from '../components/Picks';
import { GraphQLError } from 'graphql';

export const getPicksByWeekEmpty = {
  request: {
    query: PICKS_BY_WEEK_QUERY,
    variables: { weekId: '1', playerId: '2' },
  },
  result: {
    data: {
      allPicks: [],
    },
  },
};

export const getPicksByWeekAfterPick = {
  request: {
    query: PICKS_BY_WEEK_QUERY,
    variables: { weekId: '1', playerId: '2' },
  },
  result: {
    data: {
      allPicks: [
        {
          __typename: 'Pick',
          id: '77',
          player: {
            __typename: 'Player',
            id: '2',
            name: 'Matt',
          },
          game: {
            __typename: 'Game',
            id: '30',
          },
          picked: {
            __typename: 'Team',
            id: '32',
            name: 'Football Team',
            city: 'Washington',
          },
        },
      ],
    },
  },
};

import { PicksByWeekAndPlayerDocument } from '../types/generated-queries';

export const getPicksByWeekEmpty = {
  request: {
    query: PicksByWeekAndPlayerDocument,
    variables: { weekId: '1', playerId: '2' },
  },
  result: {
    data: {
      picks: [],
    },
  },
};

export const getPicksByWeekAfterPick = {
  request: {
    query: PicksByWeekAndPlayerDocument,
    variables: { weekId: '1', playerId: '2' },
  },
  result: {
    data: {
      picks: [
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

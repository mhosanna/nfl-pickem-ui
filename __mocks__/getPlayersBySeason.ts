import { PlayersBySeasonAndWeekDocument } from '../types/generated-queries';
import { GraphQLError } from 'graphql';

export const getPlayersBySeasonAndWeek = {
  request: {
    query: PlayersBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  result: {
    data: {
      players: [
        {
          __typename: 'Player',
          id: 'ckvi57p3c0086kq0hf4wvl1s5',
          name: 'Madeline',
          picksCount: 1,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvi5bd7j0437qw0hamujvxxw',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a52r0021ps0h76uyk7um',
                city: 'Buffalo',
                name: 'Bills',
              },
              game: {
                __typename: 'Game',
                id: 'ckvi5b43u0109qw0havmkhu2t',
              },
            },
            {
              __typename: 'Pick',
              id: 'ckvil0zih2651l50hsgayi6dn',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a52m0007ps0h5vxqp06k',
                city: 'Atlanta',
                name: 'Falcons',
              },
              game: {
                __typename: 'Game',
                id: 'ckvikw4v10475l50hjgrlqyb0',
              },
            },
            {
              __typename: 'Pick',
              id: 'ckvil12uj2882l50h3d9bytqu',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a52p0014ps0h2qvk8yu2',
                city: 'Baltimore',
                name: 'Ravens',
              },
              game: {
                __typename: 'Game',
                id: 'ckvikwb870634l50h239qhozr',
              },
            },
            {
              __typename: 'Pick',
              id: 'ckvpn7dtp0826vs0hikydv7gd',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a53a0077ps0hn4j95l46',
                city: 'Green Bay',
                name: 'Packers',
              },
              game: {
                __typename: 'Game',
                id: 'ckvil0skx1855l50hj2d3347q',
              },
            },
            {
              __typename: 'Pick',
              id: 'ckvil0yqh2574l50hxs3ilfbb',
              isCorrect: true,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a5330056ps0hfszu3bez',
                city: 'Dallas',
                name: 'Cowboys',
              },
              game: {
                __typename: 'Game',
                id: 'ckvil0jbj1504l50hl59l4m7h',
              },
            },
          ],
        },
        {
          __typename: 'Player',
          id: 'ckvik08c20040ih0ht4vsuvqb',
          name: 'Matt',
          picksCount: 0,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvk2kjd93181k30hi1gfhta7',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a5380070ps0hatdsgid6',
                city: 'Detroit',
                name: 'Lions',
              },
              game: {
                __typename: 'Game',
                id: 'ckvil0skx1855l50hj2d3347q',
              },
            },
          ],
        },
      ],
    },
  },
};

export const getPlayersBySeasonAndWeekNoPlayers = {
  request: {
    query: PlayersBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  result: {
    data: {
      players: null,
    },
  },
};

export const getPlayersBySeasonAndWeekNetworkError = {
  request: {
    query: PlayersBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  error: new Error('[Network error]: An error occurred'),
};

export const getPlayersBySeasonAndWeekGraphqlError = {
  request: {
    query: PlayersBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  result: {
    errors: [new GraphQLError('[GraphQL error]: Error!')],
  },
};

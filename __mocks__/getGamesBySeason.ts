import { GamesBySeasonAndWeekDocument } from '../types/generated-queries';
import { GraphQLError } from 'graphql';

export const getGamesBySeasonAndWeek = {
  request: {
    query: GamesBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  result: {
    data: {
      games: [
        {
          __typename: 'Game',
          id: 'ckvikw4v10475l50hjgrlqyb0',
          homeTeam: {
            __typename: 'Team',
            name: 'Cardinals',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Falcons',
          },
          winner: null,
          spread: 1,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvil0zih2651l50hsgayi6dn',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a52m0007ps0h5vxqp06k',
              },
              player: {
                __typename: 'Player',
                id: 'ckvi57p3c0086kq0hf4wvl1s5',
              },
            },
          ],
        },
        {
          __typename: 'Game',
          id: 'ckvil0skx1855l50hj2d3347q',
          homeTeam: {
            __typename: 'Team',
            name: 'Lions',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Packers',
          },
          winner: null,
          spread: 13,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvk2kjd93181k30hi1gfhta7',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a5380070ps0hatdsgid6',
              },
              player: {
                __typename: 'Player',
                id: 'ckvik08c20040ih0ht4vsuvqb',
              },
            },
            {
              __typename: 'Pick',
              id: 'ckvpn7dtp0826vs0hikydv7gd',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a53a0077ps0hn4j95l46',
              },
              player: {
                __typename: 'Player',
                id: 'ckvi57p3c0086kq0hf4wvl1s5',
              },
            },
          ],
        },
        {
          __typename: 'Game',
          id: 'ckvk3x2ub7342k30heiop7cgi',
          homeTeam: {
            __typename: 'Team',
            name: 'Jets',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Texans',
          },
          winner: null,
          spread: 9,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvk3yjcs8477k30hk7b8yb9t',
          homeTeam: {
            __typename: 'Team',
            name: 'Titans',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Raiders',
          },
          winner: null,
          spread: 1,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvk45eel8762k30ht6ji71rx',
          homeTeam: {
            __typename: 'Team',
            name: 'Chiefs',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Jaquars',
          },
          winner: null,
          spread: 13,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvk47nkg9071k30hydp8bgr8',
          homeTeam: {
            __typename: 'Team',
            name: 'Vikings',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Chargers',
          },
          winner: null,
          spread: 12,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvk5qck816438k30h18b6g8p5',
          homeTeam: {
            __typename: 'Team',
            name: 'Dolphins',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Patriots',
          },
          winner: null,
          spread: 12,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvikwb870634l50h239qhozr',
          homeTeam: {
            __typename: 'Team',
            name: 'Ravens',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Bills',
          },
          winner: {
            __typename: 'Team',
            id: 'ckvi5a52r0021ps0h76uyk7um',
          },
          spread: 2,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvil12uj2882l50h3d9bytqu',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a52p0014ps0h2qvk8yu2',
              },
              player: {
                __typename: 'Player',
                id: 'ckvi57p3c0086kq0hf4wvl1s5',
              },
            },
          ],
        },
        {
          __typename: 'Game',
          id: 'ckvmbuh3d4065q80h50m5607q',
          homeTeam: {
            __typename: 'Team',
            name: 'Football Team',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Ravens',
          },
          winner: null,
          spread: 12,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvikwy1b1096l50hs6cmin2m',
          homeTeam: {
            __typename: 'Team',
            name: 'Bengals',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Browns',
          },
          winner: null,
          spread: 13,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvk5ri5y16771k30hkhgxy4z4',
          homeTeam: {
            __typename: 'Team',
            name: 'Broncos',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Patriots',
          },
          winner: null,
          spread: 3,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvk6i3zk24342k30hyxui0jd4',
          homeTeam: {
            __typename: 'Team',
            name: 'Broncos',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Raiders',
          },
          winner: null,
          spread: 12,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvmbv2af4829q80htxqb9yfw',
          homeTeam: {
            __typename: 'Team',
            name: '49ers',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Packers',
          },
          winner: null,
          spread: 4,
          picks: [],
        },
        {
          __typename: 'Game',
          id: 'ckvi5b43u0109qw0havmkhu2t',
          homeTeam: {
            __typename: 'Team',
            name: 'Bills',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Panthers',
          },
          winner: null,
          spread: -10,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvi5bd7j0437qw0hamujvxxw',
              isCorrect: false,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a52r0021ps0h76uyk7um',
              },
              player: {
                __typename: 'Player',
                id: 'ckvi57p3c0086kq0hf4wvl1s5',
              },
            },
          ],
        },
        {
          __typename: 'Game',
          id: 'ckvil0jbj1504l50hl59l4m7h',
          homeTeam: {
            __typename: 'Team',
            name: 'Cowboys',
          },
          awayTeam: {
            __typename: 'Team',
            name: 'Broncos',
          },
          winner: {
            __typename: 'Team',
            id: 'ckvi5a5330056ps0hfszu3bez',
          },
          spread: -5,
          picks: [
            {
              __typename: 'Pick',
              id: 'ckvil0yqh2574l50hxs3ilfbb',
              isCorrect: true,
              picked: {
                __typename: 'Team',
                id: 'ckvi5a5330056ps0hfszu3bez',
              },
              player: {
                __typename: 'Player',
                id: 'ckvi57p3c0086kq0hf4wvl1s5',
              },
            },
          ],
        },
      ],
    },
  },
};

export const getGamesBySeasonAndWeekNoGames = {
  request: {
    query: GamesBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  result: {
    data: {
      games: [],
    },
  },
};

export const getGamesBySeasonAndWeekNetworkError = {
  request: {
    query: GamesBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  error: new Error('[Network error]: An error occurred'),
};

export const getGamesBySeasonAndWeekGraphqlError = {
  request: {
    query: GamesBySeasonAndWeekDocument,
    variables: { season: '2021', weekId: 'ckvi58ic10183kq0hf8w966r8' },
  },
  result: {
    errors: [new GraphQLError('[GraphQL error]: Error!')],
  },
};

import { WEEKS_BY_SEASON_QUERY } from "../components/Picks";
import { GraphQLError } from "graphql";

export const getWeeksBySeason = {
  request: {
    query: WEEKS_BY_SEASON_QUERY,
    variables: { season: "2020" },
  },
  result: {
    data: {
      allWeeks: [
        {
          __typename: "Week",
          id: "22",
          label: "Week 8",
          games: [],
        },
        {
          __typename: "Week",
          id: "21",
          label: "Week 7",
          games: [],
        },
        {
          __typename: "Week",
          id: "20",
          label: "Week 6",
          games: [],
        },
        {
          __typename: "Week",
          id: "19",
          label: "Week 5",
          games: [],
        },
        {
          __typename: "Week",
          id: "18",
          label: "Week 4",
          games: [
            {
              __typename: "Game",
              id: "22",
              picks: [],
              homeTeam: {
                __typename: "Team",
                id: "2",
                name: "Falcons",
                city: "Atlanta",
              },
              awayTeam: {
                __typename: "Team",
                id: "15",
                name: "Jaguars",
                city: "Jacksonville",
              },
              spread: 12,
              winner: null,
            },
          ],
        },
        {
          __typename: "Week",
          id: "3",
          label: "Week 3",
          games: [
            {
              __typename: "Game",
              id: "23",
              picks: [
                {
                  __typename: "Pick",
                  id: "23",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "23",
                  },
                  picked: {
                    __typename: "Team",
                    id: "21",
                    name: "Vikings",
                    city: "Minnesota",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "21",
                name: "Vikings",
                city: "Minnesota",
              },
              awayTeam: {
                __typename: "Team",
                id: "5",
                name: "Panthers",
                city: "Carolina",
              },
              spread: 12,
              winner: null,
            },
            {
              __typename: "Game",
              id: "19",
              picks: [
                {
                  __typename: "Pick",
                  id: "21",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "19",
                  },
                  picked: {
                    __typename: "Team",
                    id: "29",
                    name: "Seahawks",
                    city: "Seattle",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "22",
                name: "Patriots",
                city: "New England",
              },
              awayTeam: {
                __typename: "Team",
                id: "29",
                name: "Seahawks",
                city: "Seattle",
              },
              spread: 12,
              winner: null,
            },
            {
              __typename: "Game",
              id: "21",
              picks: [
                {
                  __typename: "Pick",
                  id: "22",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "21",
                  },
                  picked: {
                    __typename: "Team",
                    id: "17",
                    name: "Raiders",
                    city: "Las Vegas",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "17",
                name: "Raiders",
                city: "Las Vegas",
              },
              awayTeam: {
                __typename: "Team",
                id: "28",
                name: "49ers",
                city: "San Francisco",
              },
              spread: -10.5,
              winner: null,
            },
            {
              __typename: "Game",
              id: "24",
              picks: [
                {
                  __typename: "Pick",
                  id: "24",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "24",
                  },
                  picked: {
                    __typename: "Team",
                    id: "20",
                    name: "Dolphins",
                    city: "Miami",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "20",
                name: "Dolphins",
                city: "Miami",
              },
              awayTeam: {
                __typename: "Team",
                id: "9",
                name: "Cowboys",
                city: "Dallas",
              },
              spread: 12,
              winner: null,
            },
            {
              __typename: "Game",
              id: "25",
              picks: [
                {
                  __typename: "Pick",
                  id: "25",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "25",
                  },
                  picked: {
                    __typename: "Team",
                    id: "30",
                    name: "Buccaneers",
                    city: "Tampa Bay",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "25",
                name: "Jets",
                city: "New York",
              },
              awayTeam: {
                __typename: "Team",
                id: "30",
                name: "Buccaneers",
                city: "Tampa Bay",
              },
              spread: -1,
              winner: null,
            },
            {
              __typename: "Game",
              id: "26",
              picks: [],
              homeTeam: {
                __typename: "Team",
                id: "3",
                name: "Ravens",
                city: "Baltimore",
              },
              awayTeam: {
                __typename: "Team",
                id: "2",
                name: "Falcons",
                city: "Atlanta",
              },
              spread: 0,
              winner: null,
            },
            {
              __typename: "Game",
              id: "27",
              picks: [],
              homeTeam: {
                __typename: "Team",
                id: "23",
                name: "Saints",
                city: "New Orleans",
              },
              awayTeam: {
                __typename: "Team",
                id: "7",
                name: "Bengals",
                city: "Cincinnati",
              },
              spread: -10,
              winner: null,
            },
            {
              __typename: "Game",
              id: "28",
              picks: [],
              homeTeam: {
                __typename: "Team",
                id: "11",
                name: "Lions",
                city: "Detroit",
              },
              awayTeam: {
                __typename: "Team",
                id: "22",
                name: "Patriots",
                city: "New England",
              },
              spread: 16,
              winner: null,
            },
          ],
        },
        {
          __typename: "Week",
          id: "2",
          label: "Week 2",
          games: [
            {
              __typename: "Game",
              id: "32",
              picks: [
                {
                  __typename: "Pick",
                  id: "27",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "32",
                  },
                  picked: {
                    __typename: "Team",
                    id: "6",
                    name: "Bears",
                    city: "Chicago",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "6",
                name: "Bears",
                city: "Chicago",
              },
              awayTeam: {
                __typename: "Team",
                id: "25",
                name: "Jets",
                city: "New York",
              },
              spread: 8,
              winner: null,
            },
            {
              __typename: "Game",
              id: "17",
              picks: [
                {
                  __typename: "Pick",
                  id: "20",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "17",
                  },
                  picked: {
                    __typename: "Team",
                    id: "31",
                    name: "Titans",
                    city: "Tennessee",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "10",
                name: "Broncos",
                city: "Denver",
              },
              awayTeam: {
                __typename: "Team",
                id: "31",
                name: "Titans",
                city: "Tennessee",
              },
              spread: 5,
              winner: null,
            },
          ],
        },
        {
          __typename: "Week",
          id: "1",
          label: "Week 1",
          games: [
            {
              __typename: "Game",
              id: "30",
              picks: [],
              homeTeam: {
                __typename: "Team",
                id: "29",
                name: "Seahawks",
                city: "Seattle",
              },
              awayTeam: {
                __typename: "Team",
                id: "32",
                name: "Football Team",
                city: "Washington",
              },
              spread: -1.5,
              winner: null,
            },
            {
              __typename: "Game",
              id: "14",
              picks: [
                {
                  __typename: "Pick",
                  id: "15",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "14",
                  },
                  picked: {
                    __typename: "Team",
                    id: "17",
                    name: "Raiders",
                    city: "Las Vegas",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "17",
                name: "Raiders",
                city: "Las Vegas",
              },
              awayTeam: {
                __typename: "Team",
                id: "28",
                name: "49ers",
                city: "San Francisco",
              },
              spread: 2,
              winner: null,
            },
            {
              __typename: "Game",
              id: "13",
              picks: [
                {
                  __typename: "Pick",
                  id: "10",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "13",
                  },
                  picked: {
                    __typename: "Team",
                    id: "13",
                    name: "Texans",
                    city: "Houston",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "13",
                name: "Texans",
                city: "Houston",
              },
              awayTeam: {
                __typename: "Team",
                id: "19",
                name: "Rams",
                city: "Los Angeles",
              },
              spread: -14,
              winner: null,
            },
            {
              __typename: "Game",
              id: "12",
              picks: [
                {
                  __typename: "Pick",
                  id: "14",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "12",
                  },
                  picked: {
                    __typename: "Team",
                    id: "7",
                    name: "Bengals",
                    city: "Cincinnati",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "6",
                name: "Bears",
                city: "Chicago",
              },
              awayTeam: {
                __typename: "Team",
                id: "7",
                name: "Bengals",
                city: "Cincinnati",
              },
              spread: 10,
              winner: null,
            },
            {
              __typename: "Game",
              id: "11",
              picks: [
                {
                  __typename: "Pick",
                  id: "8",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "11",
                  },
                  picked: {
                    __typename: "Team",
                    id: "18",
                    name: "Chargers",
                    city: "Los Angeles",
                  },
                },
                {
                  __typename: "Pick",
                  id: "29",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "11",
                  },
                  picked: {
                    __typename: "Team",
                    id: "1",
                    name: "Cardinals",
                    city: "Arizona",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "1",
                name: "Cardinals",
                city: "Arizona",
              },
              awayTeam: {
                __typename: "Team",
                id: "18",
                name: "Chargers",
                city: "Los Angeles",
              },
              spread: -1,
              winner: null,
            },
            {
              __typename: "Game",
              id: "6",
              picks: [
                {
                  __typename: "Pick",
                  id: "19",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "6",
                  },
                  picked: {
                    __typename: "Team",
                    id: "23",
                    name: "Saints",
                    city: "New Orleans",
                  },
                },
                {
                  __typename: "Pick",
                  id: "31",
                  player: {
                    __typename: "Player",
                    id: "1",
                    name: "Madeline",
                  },
                  game: {
                    __typename: "Game",
                    id: "6",
                  },
                  picked: {
                    __typename: "Team",
                    id: "22",
                    name: "Patriots",
                    city: "New England",
                  },
                },
              ],
              homeTeam: {
                __typename: "Team",
                id: "22",
                name: "Patriots",
                city: "New England",
              },
              awayTeam: {
                __typename: "Team",
                id: "23",
                name: "Saints",
                city: "New Orleans",
              },
              spread: 7,
              winner: {
                __typename: "Team",
                id: "22",
              },
            },
          ],
        },
      ],
    },
  },
};

export const getWeeksBySeasonNetworkError = {
  request: {
    query: WEEKS_BY_SEASON_QUERY,
    variables: { season: "2020" },
  },
  error: new Error("An error occurred"),
};

export const getWeeksBySeasonGraphqlError = {
  request: {
    query: WEEKS_BY_SEASON_QUERY,
    variables: { season: "2020" },
  },
  result: {
    errors: [new GraphQLError("Error!")],
  },
};

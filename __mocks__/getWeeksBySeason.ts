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
              week: {
                __typename: "Week",
                id: "18",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: 12,
              winner: null,
            },
            {
              __typename: "Game",
              id: "19",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: 12,
              winner: null,
            },
            {
              __typename: "Game",
              id: "21",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: -10.5,
              winner: null,
            },
            {
              __typename: "Game",
              id: "24",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: 12,
              winner: null,
            },
            {
              __typename: "Game",
              id: "25",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: -1,
              winner: null,
            },
            {
              __typename: "Game",
              id: "26",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: 0,
              winner: null,
            },
            {
              __typename: "Game",
              id: "27",
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
              week: {
                __typename: "Week",
                id: "3",
              },
              spread: -10,
              winner: null,
            },
            {
              __typename: "Game",
              id: "28",
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
              week: {
                __typename: "Week",
                id: "3",
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
              week: {
                __typename: "Week",
                id: "2",
              },
              spread: 8,
              winner: null,
            },
            {
              __typename: "Game",
              id: "17",
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
              week: {
                __typename: "Week",
                id: "2",
              },
              spread: 5,
              winner: null,
            },
            {
              __typename: "Game",
              id: "41",
              homeTeam: {
                __typename: "Team",
                id: "9",
                name: "Cowboys",
                city: "Dallas",
              },
              awayTeam: {
                __typename: "Team",
                id: "12",
                name: "Packers",
                city: "Green Bay",
              },
              week: {
                __typename: "Week",
                id: "2",
              },
              spread: -10,
              winner: null,
            },
            {
              __typename: "Game",
              id: "42",
              homeTeam: {
                __typename: "Team",
                id: "6",
                name: "Bears",
                city: "Chicago",
              },
              awayTeam: {
                __typename: "Team",
                id: "2",
                name: "Falcons",
                city: "Atlanta",
              },
              week: {
                __typename: "Week",
                id: "2",
              },
              spread: 2,
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
              week: {
                __typename: "Week",
                id: "1",
              },
              spread: -1.5,
              winner: null,
            },
            {
              __typename: "Game",
              id: "14",
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
              week: {
                __typename: "Week",
                id: "1",
              },
              spread: 2,
              winner: null,
            },
            {
              __typename: "Game",
              id: "13",
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
              week: {
                __typename: "Week",
                id: "1",
              },
              spread: -14,
              winner: null,
            },
            {
              __typename: "Game",
              id: "12",
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
              week: {
                __typename: "Week",
                id: "1",
              },
              spread: 10,
              winner: null,
            },
            {
              __typename: "Game",
              id: "11",
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
              week: {
                __typename: "Week",
                id: "1",
              },
              spread: -1,
              winner: null,
            },
            {
              __typename: "Game",
              id: "6",
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
              week: {
                __typename: "Week",
                id: "1",
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

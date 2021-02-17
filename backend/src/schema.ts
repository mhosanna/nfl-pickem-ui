import { Context } from "./context";

export const typeDefs = `
type Query {
    teams: [Team!]!
  }

type Player {
    id: ID!
    name: String!
    picks: [Pick]
}

type Team {
    id: ID!
    name: String!
    city: String!
    games: [GameTeam]
}

type Game {
    id: ID!
    season: Int!
    week: Int!
    spread: Float!
    winner: Team
    teams: [GameTeam!]!
    picks: [Pick]
}

type Pick {
    id: ID!
    correct: Boolean
    player: Player!
    game: Game!
    team: Team!
}

type GameTeam {
    id: ID!
    field: TeamField
    team: Team!
    game: Game!
}

enum TeamField {
    HOME
    AWAY
}
`;

export const resolvers = {
  Query: {
    teams: (_parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.team.findMany({});
    },
  },
};

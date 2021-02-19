import { Context } from "./context";

export const typeDefs = `
type Query {
    teams: [Team!]!
    players: [Player]
    games: [Game]
    picks: [Pick]
  }

type Mutation {
  createGame(data: GameCreateInput!): Game!
}

input GameCreateInput {
  season: Int!
  week: Int!
  spread: Float
  teams: TeamCreateManyWithoutTeamInput
}

input TeamCreateManyWithoutTeamInput{
  create: [TeamCreateWithoutGameInput!]
}

input TeamCreateWithoutGameInput {
  field: TeamField
  teamId: Int!
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
    players: (_parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.player.findMany({});
    },
    games: (_parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.game.findMany({});
    },
    picks: (_parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick.findMany({});
    },
  },
  Mutation: {
    createGame: (_parent: any, args: any, ctx: Context) => {
      return ctx.prisma.game.create(args);
    },
  },
  Player: {
    picks: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.player
        .findUnique({
          where: { id: parent.id },
        })
        .picks();
    },
  },
  Pick: {
    player: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick
        .findUnique({
          where: { id: parent.id },
        })
        .player();
    },
    game: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick
        .findUnique({
          where: { id: parent.id },
        })
        .game();
    },
    team: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick
        .findUnique({
          where: { id: parent.id },
        })
        .team();
    },
  },
  Game: {
    teams: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.game
        .findUnique({
          where: { id: parent.id },
        })
        .teams();
    },
    picks: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.game
        .findUnique({
          where: { id: parent.id },
        })
        .picks();
    },
    winner: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.game
        .findUnique({
          where: { id: parent.id },
        })
        .winner();
    },
  },
  GameTeam: {
    team: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.gameTeam
        .findUnique({
          where: {
            teamId_gameId: {
              teamId: parent.teamId,
              gameId: parent.gameId,
            },
          },
        })
        .team();
    },
    game: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.gameTeam
        .findUnique({
          where: {
            teamId_gameId: {
              teamId: parent.teamId,
              gameId: parent.gameId,
            },
          },
        })
        .game();
    },
  },
};

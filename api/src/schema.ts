import { Context } from "./context";

export const typeDefs = `
type Query {
    teams: [Team!]!
    players(season: Int): [PlayerInfo]
    games(filter: GamesInput): Games!
    picks: [Pick]
  }

type Mutation {
  addPlayer(name: String!): PlayerPayload!
  removePlayer(playerId: Int!): PlayerPayload!
  createGame(data: GameCreateInput!): Game!
  updateGame(gameId: Int!, spread: Float!, week: Int!): GamePayload!
  deleteGame(gameId: Int!): GamePayload!
  makePick(playerId: Int!, gameId: Int!, teamId: Int!): PickPayload!
  addGameWinner(gameId: Int!, winnerId: Int!): GamePayload!
}

type PlayerInfo {
  player: Player!
  correctPicks: Int
}

input GamesInput {
  season: Int,
  week: Int
}

union PlayerPayload = Player | Error
union GamePayload = Game | Error
union PickPayload = Pick | Error

type Error {
  message: String!
  path: String!
}

input PickMakeInput {
  gameId: Int!
  playerId: Int!
  teamId: Int!
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

type Games {
  games: [Game!]!
  totalGames: Int!
  totalPlayedGames: Int!
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
    players: async (_parent: any, args: any, ctx: Context) => {
      const playersThisSeason = await ctx.prisma.player.findMany({
        where: {
          picks: {
            some: {
              game: {
                season: {
                  equals: args.season,
                },
              },
            },
          },
        },
      });

      const correctPicksCount = await ctx.prisma.pick.groupBy({
        by: ["playerId"],
        where: {
          AND: [
            {
              game: {
                season: args.season,
              },
            },
            {
              correct: {
                equals: true,
              },
            },
          ],
        },
        count: {
          correct: true,
        },
      });

      const playerInfo = playersThisSeason.map((p) => {
        let indexOfPlayer = correctPicksCount.findIndex(
          (x) => x.playerId == p.id
        );
        return {
          player: p,
          correctPicks: correctPicksCount[indexOfPlayer]
            ? correctPicksCount[indexOfPlayer].count.correct
            : 0,
        };
      });
      return playerInfo;
    },
    games: async (_parent: any, args: any, ctx: Context) => {
      const where = args.filter
        ? {
            AND: [{ week: args.filter.week }, { season: args.filter.season }],
          }
        : {};

      const games = await ctx.prisma.game.findMany({
        where,
      });
      const totalGames = await ctx.prisma.game.count({
        where,
      });
      const gamesWithWinners = await ctx.prisma.game.count({
        where,
        select: {
          winnerId: true,
        },
      });
      const totalPlayedGames = gamesWithWinners.winnerId;
      return { games, totalGames, totalPlayedGames };
    },
    picks: (_parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick.findMany({});
    },
  },
  Mutation: {
    addPlayer: async (_parent: any, args: any, ctx: Context) => {
      if (args.name.trim() === "") {
        return {
          __typename: "Error",
          message: `Player name must contain at least one alphanumeric character`,
          path: "name",
        };
      }
      const playerRecord = await ctx.prisma.player.findUnique({
        where: { name: args.name },
      });
      if (playerRecord) {
        return {
          __typename: "Error",
          message: `The player with the name ${args.name} already exists.`,
          path: "name",
        };
      } else {
        const newPlayer = await ctx.prisma.player.create({
          data: {
            name: args.name,
          },
        });
        return {
          __typename: "Player",
          ...newPlayer,
        };
      }
    },
    removePlayer: async (_parent: any, args: any, ctx: Context) => {
      const playerRecord = await ctx.prisma.player.findUnique({
        where: { id: args.playerId },
      });
      if (!playerRecord) {
        return {
          __typename: "Error",
          message: `Player with id ${args.playerId} does not exist`,
          path: "playerId",
        };
      }
      const deletePicks = ctx.prisma.pick.deleteMany({
        where: {
          playerId: args.playerId,
        },
      });
      const deletePlayer = ctx.prisma.player.delete({
        where: {
          id: args.playerId,
        },
      });
      const [, deletedPlayer] = await ctx.prisma.$transaction([
        deletePicks,
        deletePlayer,
      ]);
      return {
        __typename: "Player",
        ...deletedPlayer,
      };
    },
    createGame: (_parent: any, args: any, ctx: Context) => {
      return ctx.prisma.game.create(args);
    },
    updateGame: async (_parent: any, args: any, ctx: Context) => {
      const gameRecord = await ctx.prisma.game.findUnique({
        where: { id: args.gameId },
      });
      if (!gameRecord) {
        return {
          __typename: "Error",
          message: `Game with id ${args.gameId} does not exist`,
          path: "gameId",
        };
      }
      const updatedGame = await ctx.prisma.game.update({
        where: {
          id: args.gameId,
        },
        data: {
          spread: args.spread,
          week: args.week,
        },
      });
      return {
        __typename: "Game",
        ...updatedGame,
      };
    },
    deleteGame: async (_parent: any, args: any, ctx: Context) => {
      const gameRecord = await ctx.prisma.game.findUnique({
        where: { id: args.gameId },
      });
      if (!gameRecord) {
        return {
          __typename: "Error",
          message: `Game with id ${args.gameId} does not exist`,
          path: "gameId",
        };
      }
      if (gameRecord.winnerId) {
        return {
          __typename: "Error",
          message: `Cannot delete a game after winner has been set`,
          path: "gameId",
        };
      }
      const deletePicks = ctx.prisma.pick.deleteMany({
        where: {
          gameId: args.gameId,
        },
      });
      const deleteMatchups = ctx.prisma.gameTeam.deleteMany({
        where: {
          gameId: args.gameId,
        },
      });
      const deleteGame = ctx.prisma.game.delete({
        where: {
          id: args.gameId,
        },
        select: {
          id: true,
        },
      });
      const [, , deletedGame] = await ctx.prisma.$transaction([
        deletePicks,
        deleteMatchups,
        deleteGame,
      ]);
      return {
        __typename: "Game",
        ...deletedGame,
      };
    },
    makePick: async (_parent: any, args: any, ctx: Context) => {
      const gameRecord = await ctx.prisma.game.findUnique({
        where: { id: args.gameId },
        include: { teams: true },
      });
      if (!gameRecord) {
        return {
          __typename: "Error",
          message: `Game with id ${args.gameId} does not exist`,
          path: "gameId",
        };
      }
      if (gameRecord.winnerId) {
        return {
          __typename: "Error",
          message: `Cannot make pick after game winner has been set`,
          path: "gameId",
        };
      }
      const found = gameRecord.teams.some((el) => el.teamId === args.teamId);
      if (!found) {
        return {
          __typename: "Error",
          message: `Must pick team playing in the game`,
          path: "teamId",
        };
      }
      const madePick = await ctx.prisma.pick.upsert({
        where: {
          playerId_gameId: {
            playerId: args.playerId,
            gameId: args.gameId,
          },
        },
        create: {
          gameId: args.gameId,
          playerId: args.playerId,
          teamId: args.teamId,
        },
        update: {
          teamId: args.teamId,
        },
      });
      return {
        __typename: "Pick",
        ...madePick,
      };
    },
    addGameWinner: async (_parent: any, args: any, ctx: Context) => {
      const gameRecord = await ctx.prisma.game.findUnique({
        where: { id: args.gameId },
        include: { teams: true },
      });
      if (!gameRecord) {
        return {
          __typename: "Error",
          message: `Game with id ${args.gameId} does not exist`,
          path: "gameId",
        };
      }
      const found = gameRecord.teams.some((el) => el.teamId === args.winnerId);
      if (!found) {
        return {
          __typename: "Error",
          message: `Must set winning team to team playing in the game`,
          path: "teamId",
        };
      }
      const game = await ctx.prisma.game.update({
        where: {
          id: args.gameId,
        },
        data: {
          winnerId: args.winnerId,
        },
      });
      //find all picks where gameId = args.gameId
      await ctx.prisma.pick.updateMany({
        where: {
          AND: [{ gameId: args.gameId }, { teamId: args.winnerId }],
        },
        data: {
          correct: true,
        },
      });

      await ctx.prisma.pick.updateMany({
        where: {
          AND: [{ gameId: args.gameId }, { teamId: { not: args.winnerId } }],
        },
        data: {
          correct: false,
        },
      });

      const correctPicksCount = await ctx.prisma.pick.groupBy({
        by: ["playerId"],
        where: {
          correct: {
            equals: true,
          },
        },
        count: {
          correct: true,
        },
      });

      // const allPlayers = await ctx.prisma.player.findMany({});

      // for (const player of allPlayers) {
      //   let p = correctPicksCount.find((p) => p.playerId === player.id);
      //   let totalCorrect = p?.count.correct;
      //   await ctx.prisma.player.update({
      //     where: { id: player.id },
      //     data: { totalPicksCorrect: totalCorrect ? totalCorrect : 0 },
      //   });
      // }

      return {
        __typename: "Game",
        ...game,
      };
    },
  },
  PlayerPayload: {
    __resolveType(obj: any, _context: any, _info: any) {
      if (obj.name) {
        return "Player";
      }
      if (obj.message) {
        return "Error";
      }
      return null;
    },
  },
  GamePayload: {
    __resolveType(obj: any, _context: any, _info: any) {
      if (obj.id) {
        return "Game";
      }
      if (obj.message) {
        return "Error";
      }
      return null;
    },
  },
  PickPayload: {
    __resolveType(obj: any, _context: any, _info: any) {
      if (obj.gameId) {
        return "Pick";
      }
      if (obj.message) {
        return "Error";
      }
      return null;
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
          where: {
            playerId_gameId: {
              gameId: parent.gameId,
              playerId: parent.playerId,
            },
          },
        })
        .player();
    },
    game: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick
        .findUnique({
          where: {
            playerId_gameId: {
              gameId: parent.gameId,
              playerId: parent.playerId,
            },
          },
        })
        .game();
    },
    team: (parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.pick
        .findUnique({
          where: {
            playerId_gameId: {
              gameId: parent.gameId,
              playerId: parent.playerId,
            },
          },
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

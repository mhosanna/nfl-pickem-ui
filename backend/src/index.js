const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API of the NFL Pickem League Website`,
    players: async (parent, args, context) => {
      return context.prisma.player.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newPlayer = context.prisma.player.create({
        data: {
          name: args.name,
        },
      });
      return newPlayer;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

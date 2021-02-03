const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Game = require("./resolvers/Game");
const Season = require("./resolvers/Season");
const Pick = require("./resolvers/Pick");

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Game,
  Season,
  Pick,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

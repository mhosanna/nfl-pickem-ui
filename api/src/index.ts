const { ApolloServer } = require("apollo-server");
import { typeDefs, resolvers } from "./schema";
const { createContext } = require("./context");

new ApolloServer({ typeDefs, resolvers, context: createContext }).listen(
  { port: 4000 },
  () => console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ `)
);

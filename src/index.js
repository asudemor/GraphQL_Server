import { ApolloServer } from "apollo-server";


import db from "./data";
import pubsub from "./pubsub";

import typeDefs from "./graphql/type-defs/";
import resolvers from "./graphql/resolvers/";



const server = new ApolloServer({ typeDefs, resolvers,  context: { pubsub, db } });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

////////////////////////////////////////////////

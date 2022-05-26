const { ApolloServer } = require('apollo-server');


const db = require('./data');
const pubsub = require('./pubsub')

const  typeDefs = require ('./graphql/type-defs/')
const resolvers = require ('./graphql/resolvers/')

console.log(resolvers)


const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub, db } });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

////////////////////////////////////////////////

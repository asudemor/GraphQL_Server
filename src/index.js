const { ApolloServer, withFilter, } = require('apollo-server');


const db = require('./data');
const pubsub = require('./pubsub')

const { typeDefs } = require ('./graphql/schema')
const resolvers = require ('./graphql/resolvers/index')




const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub, db } });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

////////////////////////////////////////////////

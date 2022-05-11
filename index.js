const { ApolloServer, gql } = require('apollo-server');
const { users, posts, comments } = require('./data')

const typeDefs = gql`

  type User {
    id: ID!,
    full_name: String!,
    posts: [Post!]!
    comments: [Comments]
  },

  type Post {
    id: ID!,
    title: String!,
    user_id: ID!,
    user: User!
    comments: [Comments!]
  },

  type Comments {
    id: ID!,
    text: String!,
    post_id: ID!,
    post: Post!
    user_id: String!,
    user: User!,
  },

  type Query {
    # Users
    users: [User!]!
    user(id: ID!): User!


    #Posts
    posts: [Post!]!
    post (id: ID!  filter: String) : Post!

    #Commets
    comments: [Comments]
    comment(id: ID!): [Comments] 
  }
`


const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args ) => users.find(user => user.id === args.id ),

    posts: () => posts,
    post: (parent,args) => posts.find ( post => post.id === args.id || post.title.startsWith(args.filter) ),

    comments: () => comments,
    comment: (parent, args) => comments.filter( comment => comment.id === args.id)
  },

  User:{
    posts: (parent,args) => posts.filter(post => post.user_id === parent.id),
    comments: (parent, args) => comments.filter( comment => comment.user_id === parent.id)
  },
  Post: {
    user: (parent, args ) => users.find(user =>  user.id === parent.user_id),
    comments: (parent, args) => comments.filter( comment => comment.post_id === parent.id),
  },
  Comments:{
    user: (parent, args) => users.find(user => user.id === parent.user_id),
    post: (parent,args) => posts.find(post => post.id === parent.post_id),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
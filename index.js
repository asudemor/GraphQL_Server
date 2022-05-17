const { ApolloServer, gql } = require('apollo-server');
const {nanoid} = require('nanoid')
const { users, posts, comments } = require('./data')

const typeDefs = gql`

  input createUserInput {
    full_name: String!
    age: Int!
  }

  input updateUserInput{
    full_name: String
    age: Int
  }

  type DeleteAllOutput {
    count: Int!
    posts: Post!
  }

  type User {
    id: ID!,
    full_name: String!,
    age: String!
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
  },
  type Mutation{
    # Users
    createUser(data: createUserInput!) : User!
    updateUser (id: ID!, data: updateUserInput!): User!
    deleteUser (id: ID!): User!
    deleteAllUsers: DeleteAllOutput! 

    # Posts
    createPost(title: String!, user_id: ID!): Post!
    deletePost (id:ID!): Post!
    deleteAllPosts: DeleteAllOutput!

    # Comments
    createComment(text: String!, post_id: ID!, user_id: ID!): Comments!
    deleteComment(id: ID!): Comments!
  }
`


const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    posts: () => posts,
    post: (parent, args) =>
      posts.find(
        (post) => post.id === args.id || post.title.startsWith(args.filter)
      ),

    comments: () => comments,
    comment: (parent, args) =>
      comments.filter((comment) => comment.id === args.id),
  },
  Mutation: {
    // Users Mutaiton
    createUser: (parent, { full_name }) => {
      const user = {
        id: nanoid(),
        full_name: data.full_name,
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index == -1) throw new Error('User not found');
      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updated_user;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index === -1) throw new Error('User not found');

      const deleted_user = users[user_index];
      users.splice(user_index, 1);
      return deleted_user;
    },
    deleteAllUsers: () => {
      const length = users.length;
     const allUsers = users
      users.splice(0,length) ;
      return {count: length}
    },

    // Posts Mutation
    createPost: (parent, args) => {
      const post = {
        id: nanoid(),
        title: args.title,
        user_id: args.user_id,
      };
      posts.push(post);
      return post;
    },
    deletePost: (parent, { id }) => {
      const post_index = posts.findIndex((post) => post.id === id);
      if (post_index === -1) throw new Error('Post not found');
      const deleted_post = posts[post_index];
      posts.splice(post_index, 1);
      return deleted_post;
    },
    deleteAllPosts: () => {
      const length = posts.length;
      posts.splice(0,length) ;
      return {count: length}
    },
    
    // Comments Mutation
    createComment: (parent, args) => {
      const comment = {
        id: nanoid(),
        text: args.text,
        user_id: args.user_id,
        post_id: args.post_id,
      };
      comments.push(comment);
      return comment;
    },

    deleteComment: (parent, { id }) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);
      if (comment_index === -1) throw new Error('Comment not found');
      const deleted_comment = comments[comment_index];
      comments.splice(comment_index, 1);
      return deleted_comment;
    },
  },

  // OTHERS
  User: {
    posts: (parent, args) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.user_id === parent.id),
  },
  Post: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },
  Comments: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    post: (parent, args) => posts.find((post) => post.id === parent.post_id),
  },
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





////////////////////////////////////////////////


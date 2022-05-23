const { GraphQLServer, PubSub } = require('graphql-yoga')
const {nanoid} = require('nanoid')
const { users, posts, comments } = require('./data')



const typeDefs = `

# Veri Tipleri
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
  type DeleteAllOutput {
    count: Int!
    posts: Post!
  }

  
# Input İşlemleri
  input createUserInput {
    full_name: String!
    age: Int!
  }

  input updateUserInput{
    full_name: String
    age: Int
  }

  input upadtePostInput {
    title: String,
    user_id: String
  }

  input upadteCommentInput {
    text: String!
    post_id: String
  }


# Query Sorguları
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

# Mutation İşlemleri 
  type Mutation{
    # Users
    createUser(data: createUserInput!) : User!
    updateUser (id: ID!, data: updateUserInput!): User!
    deleteUser (id: ID!): User!
    deleteAllUsers: DeleteAllOutput! 

    # Posts
    createPost(title: String!, user_id: ID!): Post!
    updatePost(id: ID!, data: upadtePostInput!): Post!
    deletePost (id:ID!): Post!
    deleteAllPosts: DeleteAllOutput!

    # Comments
    createComment(text: String!, post_id: ID!, user_id: ID!): Comments!
    updateComment(id: ID!, data: upadteCommentInput!): Comments!
    deleteComment(id: ID!): Comments!

  }

  type Subscription{
    userCreated: User!
    userUpdated: User!
    userDeleted: User!


    postCreated: Post!
    postUpdated: Post!
    postDeleted: Post!

    createComment: Comments!
    updateComment: Comments!
    deleteComment: Comments!
  }
`


const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("userCreated")
    },
    userUpdated: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("userUpdated")
    },
    userDeleted: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("userDeleted")
    },
    postCreated: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("postCreated")
    },
    postUpdated: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("postUpdated")
    },
    postDeleted: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("postDeleted")
    },
    createComment: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("createComment")
    },
    updateComment: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("updateComment")
    },
    deleteComment: {
      subscribe: (parent, args, { pubsub }) =>  pubsub.asyncIterator("deleteComment")
    },
    
  },
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
    createUser: (parent, {data:{ full_name, age }}) => {
      const user = {
        id: nanoid(),
        full_name: full_name,
        age: age
      };
      users.push(user);
      pubsub.publish('userCreated', {userCreated:user})
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index == -1) throw new Error('User not found');
      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      pubsub.publish('userUpdated', {userUpdated: updated_user})
      return updated_user;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index === -1) throw new Error('User not found');
      
      const deleted_user = users[user_index];
      users.splice(user_index, 1);
      pubsub.publish('userDeleted', {userDeleted: deleted_user})
      return deleted_user;
    },
    deleteAllUsers: () => {
      const length = users.length;
     const allUsers = users
      users.splice(0,length) ;
      return {count: length}
    },

    // Posts Mutation
    createPost: (parent, args, {pubsub}) => {
      const post = {
        id: nanoid(),
        title: args.title,
        user_id: args.user_id,
      };
      posts.push(post);
      pubsub.publish('postCreated', {postCreated: post})
      return post;
    },
    updatePost: (parent, { id, data }, {pubsub}) => {
      const post_index = posts.findIndex((post) => post.id === id);
      if (post_index == -1) throw new Error('Post not found');
      const updated_post = (posts[post_index] = {
        ...posts[post_index],
        ...data,
      });
      pubsub.publish('postUpdated', {postUpdated:updated_post})
      return updated_post;
    },
    deletePost: (parent, { id }, {pubsub}) => {
      const post_index = posts.findIndex((post) => post.id === id);
      if (post_index === -1) throw new Error('Post not found');
      const deleted_post = posts[post_index];
      posts.splice(post_index, 1);
      pubsub.publish('postDeleted', {postDeleted:deleted_post})
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
      pubsub.publish('createComment',{createComment:comment})
      return comment;
    },
    updateComment: (parent, { id, data }, {pubsub}) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);
      if (comment_index == -1) throw new Error('Comment not found');
      const updated_comment = (comments[comment_index] = {
        ...comments[comment_index],
        ...data,
      });
      pubsub.publish('updateComment', {postUpdated:updated_comment})
      return updated_comment;
    },

    deleteComment: (parent, { id }, {pubsub}) => {
      const comment_index = comments.findIndex((comment) => comment.id === id);
      if (comment_index === -1) throw new Error('Comment not found');
      const deleted_comment = comments[comment_index];
      pubsub.publish('deleteComment', {deleteComment:deleted_comment})
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


const pubsub = new PubSub()

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })

server.start(({port}) => console.log('server listening on ' + port))



////////////////////////////////////////////////


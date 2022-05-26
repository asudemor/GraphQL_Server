const { gql } = require("apollo-server");


const typeDefs = gql`

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
      deleteAllComment: DeleteAllOutput!

    }

    type Subscription{
      userCreated: User!
      userUpdated: User!
      userDeleted: User!


      postCreated(user_id: ID ): Post!
      postUpdated: Post!
      postDeleted: Post!

      createComment(post_id: ID): Comments!
      updateComment: Comments!
      deleteComment: Comments!
    }
`;

module.exports = { typeDefs }
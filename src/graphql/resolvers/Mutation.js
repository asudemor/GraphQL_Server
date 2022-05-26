const { nanoid } = require('nanoid');
const pubsub = require('../../pubsub');


const Mutation = {
    // Users Mutaiton
    createUser: (parent, { data: { full_name, age }}, {db}) => {
      const user = {
        id: nanoid(),
        full_name: full_name,
        age: age,
      };
      db.users.push(user);
      pubsub.publish('userCreated', { userCreated: user });
      return user;
    },
    updateUser: (parent, { id, data }, {db}) => {
      const user_index = db.users.findIndex((user) => user.id === id);
      if (user_index == -1) throw new Error('User not found');
      const updated_user = (db.users[user_index] = {
        ...db.users[user_index],
        ...data,
      });
      pubsub.publish('userUpdated', { userUpdated: updated_user });
      return updated_user;
    },
    deleteUser: (_, { id }, {db}) => {
      const user_index = db.users.findIndex((user) => user.id === id);
      if (user_index === -1) throw new Error('User not found');

      const deleted_user = db.users[user_index];
      db.users.splice(user_index, 1);
      pubsub.publish('userDeleted', { userDeleted: deleted_user });
      return deleted_user;
    },
    deleteAllUsers: (_, args, {db}) => {
      const length = db.users.length;
      const allUsers = db.users;
      db.users.splice(0, length);
      return { count: length };
    },

    // Posts Mutation
    createPost: (parent, args, { pubsub, db }) => {
      const post = {
        id: nanoid(),
        title: args.title,
        user_id: args.user_id,
      };
      db.posts.push(post);
      pubsub.publish('postCreated', { postCreated: post });
      return post;
    },
    updatePost: (parent, { id, data }, { pubsub, db }, ) => {
      const post_index = db.posts.findIndex((post) => post.id === id);
      if (post_index == -1) throw new Error('Post not found');
      const updated_post = (db.posts[post_index] = {
        ...db.posts[post_index],
        ...data,
      });
      pubsub.publish('postUpdated', { postUpdated: updated_post });
      return updated_post;
    },
    deletePost: (parent, { id }, { pubsub, db }) => {
      const post_index = db.posts.findIndex((post) => post.id === id);
      if (post_index === -1) throw new Error('Post not found');
      const deleted_post = db.posts[post_index];
      db.posts.splice(post_index, 1);
      pubsub.publish('postDeleted', { postDeleted: deleted_post });
      return deleted_post;
    },
    deleteAllPosts: (_, args, {db}) => {
      const length = db.posts.length;
      db.posts.splice(0, length);
      return { count: length };
    },

    // Comments Mutation
    createComment: (parent, args, { pubsub, db }) => {
      const comment = {
        id: nanoid(),
        text: args.text,
        user_id: args.user_id,
        post_id: args.post_id,
      };
      db.comments.push(comment);
      pubsub.publish('createComment', { createComment: comment });
      return comment;
    },
    updateComment: (parent, { id, data }, { pubsub, db }) => {
      const comment_index = db.comments.findIndex((comment) => comment.id === id);
      if (comment_index == -1) throw new Error('Comment not found');
      const updated_comment = (db.comments[comment_index] = {
        ...db.comments[comment_index],
        ...data,
      });
      pubsub.publish('updateComment', { postUpdated: updated_comment });
      return updated_comment;
    },

    deleteComment: (parent, { id }, { pubsub, db }) => {
      const comment_index = db.comments.findIndex((comment) => comment.id === id);
      if (comment_index === -1) throw new Error('Comment not found');
      const deleted_comment = db.comments[comment_index];
      pubsub.publish('deleteComment', { deleteComment: deleted_comment });
      db.comments.splice(comment_index, 1);
      return deleted_comment;
    },
    deleteAllComment: (_, args, {db}) => {
      const length = db.comments.length;
      db.comments.splice(0, length);
      return { count: length };
    },
  }

  module.exports.Mutation = Mutation;
const { withFilter } = require("apollo-server");

const Subscription ={
    userCreated: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('userCreated'),
    },
    userUpdated: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('userUpdated'),
    },
    userDeleted: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('userDeleted'),
    },
    postCreated: {
      subscribe: withFilter(
        (parent, args, { pubsub }) => pubsub.asyncIterator('postCreated'),
        (payloads, variables) => (variables.user_id) ? payloads.postCreated.user_id === variables.user_id : true
      ),
    },
    postUpdated: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('postUpdated'),
    },
    postDeleted: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('postDeleted'),
    },
    createComment: {
      subscribe: withFilter(
        (parent, args, { pubsub }) => pubsub.asyncIterator('createComment'),
          (payloads,variables) => (variables.post_id) ? payloads.createComment.post_id === variables.post_id : true
      )
    },
    updateComment: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('updateComment'),
    },
    deleteComment: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator('deleteComment'),
    },
    postCount: {
      subscribe: (parent, args, {pubsub}) => pubsub.asyncIterator('postCount')
    },
  }
  module.exports.Subscription = Subscription;


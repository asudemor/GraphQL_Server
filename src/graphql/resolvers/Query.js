const Query = {
    users: (parent, args, {db}) => db.users,
    user: (parent, args, {db}) => db.users.find((user) => user.id === args.id),

    posts: (parent, args, {db}) => db.posts,
    post: (parent, args, { db }) =>
      db.posts.find(
        (post) => post.id === args.id || post.title.startsWith(args.filter)
      ),

    comments: (parent, args, {db}) => db.comments,
    comment: (parent, args, {db}) =>
      db.comments.filter((comment) => comment.id === args.id),

  }

  module.exports.Query = Query;
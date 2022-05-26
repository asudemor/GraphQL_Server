/* const Comments = require ('./Comments')
const Mutation = require ('./Mutation')
const Post = require ('./Post')
const Query = require ('./Query')
const Subscription = require ('./Subscription')
const User = require ('./User')


module.exports = {
    Comments,
    Mutation,
    Post,
    Query,
    Subscription,
    User
} */

// ./graphql/resolvers.js
const path = require('path');
const { mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const resolversArray = loadFilesSync(path.join(__dirname), {
  extensions: ['js'],
  extractExports: (fileExport) => {
    if (typeof fileExport === 'function') {
      return fileExport('query_root');
    }
    return fileExport;
  },
});

module.exports = mergeResolvers(resolversArray);

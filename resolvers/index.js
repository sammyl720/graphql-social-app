const Query = require("./Query");
const PostOrError = require("./resolveTypes/PostOrError");
const UserOrError = require("./resolveTypes/UserOrError");
const Mutation = require('./Mutation');
module.exports = {
  Query,
  PostOrError,
  UserOrError,
  Mutation
}
const Query = require("./Query");
const PostOrError = require("./resolveTypes/PostOrError");
const UserOrError = require("./resolveTypes/UserOrError");
const Mutation = require('./Mutation');
const TokenOrError = require("./resolveTypes/TokenOrError");
const SuccessOrError = require("./resolveTypes/SuccessOrError");
module.exports = {
  Query,
  PostOrError,
  UserOrError,
  TokenOrError,
  SuccessOrError,
  Mutation,
  
}
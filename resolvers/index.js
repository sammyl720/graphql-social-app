const Query = require("./Query");
const PostOrError = require("./resolveTypes/PostOrError");
const UserOrError = require("./resolveTypes/UserOrError");
const Mutation = require('./Mutation');
const TokenOrError = require("./resolveTypes/TokenOrError");
const SuccessOrError = require("./resolveTypes/SuccessOrError");
const User = require("./User");
const Post = require("./Post");
const Date = require("./Date");
const Comment = require("./Comment");
const CommentOrError = require("./resolveTypes/CommentOrError");
const Image = require("./Image");
module.exports = {
  Query,
  PostOrError,
  UserOrError,
  TokenOrError,
  CommentOrError,
  SuccessOrError,
  Mutation,
  Comment,
  User,
  Post,
  Date,
  Image
}
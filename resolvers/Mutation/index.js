const addComment = require("./addComment");
const addPost = require("./addPost");
const deletePost = require("./deletePost");
const follow = require("./follow");
const login = require("./login");
const signup = require("./signup");
const toggleLikePost = require("./toggleLikePost");
const unfollow = require("./unfollow");

module.exports = {
  addPost,
  login,
  signup,
  deletePost,
  toggleLikePost,
  follow,
  unfollow,
  addComment
}
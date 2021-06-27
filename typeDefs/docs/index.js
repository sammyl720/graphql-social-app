const addComment = require("./addComment");
const addCommentToPost = require("./addCommentToPost");
const addFollow = require("./addFollow");
const addPost = require("./addPost");
const deleteComment = require("./deleteComment");
const deletePost = require("./deletePost");
const find = require("./find");
const follow = require("./follow");
const login = require("./login");
const signup = require("./signup");
const toggleLikeComment = require("./toggleLikeComment");
const toggleLikePost = require("./toggleLikePost");
const unfollow = require("./unfollow");
const updateProfile = require("./updateProfile");

module.exports = {
  login,
  signup,
  addPost,
  updateProfile,
  addCommentToPost,
  addComment,
  deletePost,
  deleteComment,
  toggleLikePost,
  toggleLikeComment,
  follow,
  unfollow,
  addFollow,
  find
}
const addComment = require("./addComment");
const addCommentToPost = require("./addCommentToPost");
const addFollow = require("./addFollow");
const addPost = require("./addPost");
const deleteComment = require("./deleteComment");
const deletePost = require("./deletePost");
const follow = require("./follow");
const login = require("./login");
const signup = require("./signup");
const toggleLikeComment = require("./toggleLikeComment");
const toggleLikePost = require("./toggleLikePost");
const unfollow = require("./unfollow");
const updateProfile = require("./updateProfile");

module.exports = {
  addPost,
  login,
  signup,
  updateProfile,
  deletePost,
  toggleLikePost,
  toggleLikeComment,
  addFollow, // For users with private accounts
  follow,
  unfollow,
  addCommentToPost, // <- adds a comment to a top level post
  addComment, // <-adds a comment to another comment
  deleteComment
}
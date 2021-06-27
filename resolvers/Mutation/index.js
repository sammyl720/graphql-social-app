const addComment = require("./addComment");
const addPost = require("./addPost");
const deletePost = require("./deletePost");
const follow = require("./follow");
const login = require("./login");
const signup = require("./signup");
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
  follow,
  unfollow,
  addComment
}
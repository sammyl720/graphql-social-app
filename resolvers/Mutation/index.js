const addPost = require("./addPost");
const deletePost = require("./deletePost");
const login = require("./login");
const signup = require("./signup");
const toggleLikePost = require("./toggleLikePost");

module.exports = {
  addPost,
  login,
  signup,
  deletePost,
  toggleLikePost: toggleLikePost
}
const addComment = require("./addComment");
const addCommentToPost = require("./addCommentToPost");
const addPost = require("./addPost");
const deletePost = require("./deletePost");
const login = require("./login");
const signup = require("./signup");
const updateProfile = require("./updateProfile");

module.exports = {
  login,
  signup,
  addPost,
  updateProfile,
  addCommentToPost,
  addComment,
  deletePost
}
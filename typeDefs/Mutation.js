const { login, signup, addPost, updateProfile, addCommentToPost, addComment, deletePost } = require("./docs");

module.exports = `
  type Mutation{
    """
    ${login}
    """
    login(data: LoginInput): TokenOrError!
    """
    ${signup}
    """
    signup(data: SignupInput): TokenOrError!
    """
    ${addPost}
    """
    addPost(data: AddPostInput): PostOrError! @ensureAuth
    """
    ${updateProfile}
    """
    updateProfile(data: updateProfileInput): SuccessOrError! @ensureAuth
    """
    ${addCommentToPost}
    """
    addCommentToPost(data: AddPostCommentInput): CommentOrError! @ensureAuth
    """
    ${addComment}
    """
    addComment(data: AddCommentInput): CommentOrError! @ensureAuth
    """
    ${deletePost}
    """
    deletePost(id: ID!): SuccessOrError! @ensureAuth
    toggleLikePost(id: ID!): SuccessOrError! @ensureAuth
    toggleLikeComment(id: ID!): SuccessOrError! @ensureAuth
    follow(userId: ID!): SuccessOrError! @ensureAuth
    unfollow(userId: ID!): SuccessOrError! @ensureAuth
    addFollow(userId: ID!): SuccessOrError! @ensureAuth
  }
`
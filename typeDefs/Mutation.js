const { login, signup, addPost, updateProfile, addCommentToPost, addComment, deletePost, toggleLikePost, toggleLikeComment, follow, unfollow, addFollow } = require("./docs");

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
    """
    ${toggleLikePost}
    """
    toggleLikePost(id: ID!): SuccessOrError! @ensureAuth
    """
    ${toggleLikeComment}
    """
    toggleLikeComment(id: ID!): SuccessOrError! @ensureAuth
    """
    ${follow}
    """
    follow(userId: ID!): SuccessOrError! @ensureAuth
    """
    ${unfollow}
    """
    unfollow(userId: ID!): SuccessOrError! @ensureAuth
    """
    ${addFollow}
    """
    addFollow(userId: ID!): SuccessOrError! @ensureAuth
  }
`
module.exports = `
  type Mutation{
    login(data: LoginInput): TokenOrError!
    signup(data: SignupInput): TokenOrError!
    addPost(data: AddPostInput): PostOrError! @ensureAuth
    updateProfile(data: updateProfileInput): SuccessOrError! @ensureAuth
    addComment(data: AddCommentInput): CommentOrError! @ensureAuth
    deletePost(id: ID!): SuccessOrError! @ensureAuth
    toggleLikePost(id: ID!): SuccessOrError! @ensureAuth
    follow(userId: ID!): SuccessOrError! @ensureAuth
    unfollow(userId: ID!): SuccessOrError! @ensureAuth
    addFollow(userId: ID!): SuccessOrError! @ensureAuth
  }
`
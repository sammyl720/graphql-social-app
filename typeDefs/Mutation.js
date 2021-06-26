module.exports = `
  type Mutation{
    login(data: LoginInput): TokenOrError!
    signup(data: SignupInput): TokenOrError!
    addPost(data: AddPostInput): PostOrError! @ensureAuth
    deletePost(id: ID!): SuccessOrError! @ensureAuth
    toggleLikePost(id: ID!): SuccessOrError! @ensureAuth
  }
`
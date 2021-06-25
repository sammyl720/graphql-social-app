module.exports = `
  type Mutation{
    login(data: LoginInput): TokenOrError!
    signup(data: SignupInput): TokenOrError!
    addPost(data: AddPostInput): PostOrError! @ensureAuth
  }
`
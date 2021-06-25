module.exports = `
  type Mutation{
    login(data: LoginInput): UserOrError!
    signup(data: SignupInput): UserOrError!
    addPost(data: AddPostInput): PostOrError!
  }
`
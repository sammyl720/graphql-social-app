module.exports = `
  input AddPostInput {
    text: String!
    images: [String]
    public: Boolean
  }

  input LoginInput {
    email: String
    password: String
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }
`
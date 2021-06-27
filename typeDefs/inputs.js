module.exports = `
  input AddPostInput {
    text: String!
    images: [String]
    public: Boolean
  }
  input AddCommentInput {
    postId: ID!
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

  input updateProfileInput{
    name: String
    gender: Gender
    profile_img: String
    bio: String
    private: Boolean
  }
`
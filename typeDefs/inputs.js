module.exports = `
  input ImageInput {
    base64:String!
    filename:String!
  }
  input AddPostInput {
    text: [String!]
    images: [ImageInput]
    public: Boolean
  }
  input AddPostCommentInput {
    postId: ID!
    text: [String!]
    images: [ImageInput]
    public: Boolean
  }
  input AddCommentInput {
    commentId: ID!
    text: [String!]
    images: [ImageInput]
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
    profile_img: ImageInput
    bio: String
    private: Boolean
  }

  input FindInput {
    text:String!
    limit: Int
  }
`
module.exports = `
type User {
  id:ID!
  email: String!
  name: String
  bio: String
  profile_img: String,
  date_joined: String,
  last_login: String!
  followers: [User]
  following: [User]
  posts: [Post]
}

type Error {
  message: String!
  errors: [String]
}

type Post {
  id:ID!
  text: String!
  created_on: String!
  user: User
  images: [String]
  public: Boolean
  likes: [User!]
  hash_tags: [String]
  comments: [Comment!]
}

type Comment {
  id: ID!
  text: String!
  images: [String]
  user: ID!
  created_on: String
  post: ID
  likes: [User!]
  comments: [Comment]
  hash_tags: [String]
}
 type Token {
   token: String!
 }

 type Success {
   status: String!
 }
`
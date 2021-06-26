module.exports = `
type User {
  id:ID!
  email: String!
  name: String
  bio: String
  profile_img: String,
  date_joined: Date,
  last_login: Date
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
  created_on: Date
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
  created_on: Date
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

 type Date {
   unix: String
   full_date: String
   utc:String
   date: String
   time: String
 }
`
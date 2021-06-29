module.exports = `
enum Gender {
  Male
  Female
  NonBinary
  Unspecified
}
type User {
  verified: Boolean
  id:ID!
  likedPosts: [Post]
  private: Boolean
  email: String!
  name: String
  bio: String
  gender: Gender!
  profile_img: String
  date_joined: Date
  last_login: Date
  requests: [User]
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
  text: [String!]
  likeCount: Int
  created_on: Date
  user: User!
  score:Int
  images: [String]
  public: Boolean
  likes: [User!]
  hash_tags: [String]
  comments: [Comment!]
}

type Comment {
  id: ID!
  text: [String!]
  images: [String]
  user: User!
  created_on: Date
  post: Post!
  public: Boolean!
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

 type FindResult {
   users: [User]!
   posts: [Post]!
   comments: [Comment]!
 }

 type Feed {
   friends: [Post]!
   recommended: [Post]!
   popular: [Post]!
 }
`
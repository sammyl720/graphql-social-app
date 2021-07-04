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
  likedPosts(limit: Int, skip: Int): [Post]
  private: Boolean
  email: String!
  name: String
  bio: String
  gender: Gender!
  profile_img: Image
  date_joined: Date
  last_login: Date
  requests(limit: Int, skip: Int): [User]
  followers(limit: Int, skip: Int): [User]
  following(limit: Int, skip: Int): [User]
  posts(limit: Int, skip: Int): [Post]
}

type Error {
  id: ID!
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
  images: [Image]
  public: Boolean
  likes(skip: Int, limit: Int): [User!]
  hash_tags: [String]
  comments(skip: Int, limit: Int): [Comment!]
}

type Comment {
  id: ID!
  text: [String!]
  images: [Image]
  user: User!
  created_on: Date
  post: Post!
  public: Boolean!
  likes(skip:Int, limit: Int): [User!]
  comments(skip: Int, limit: Int): [Comment]
  hash_tags: [String]
}
 type Token {
   token: String!
   expireTime: String!
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

 type Image {
   id: ID!
   asset_id: String!
   public_id:String!
   url: String!
   secure_url:String!
   format: String
   resource_type:String
   created_at:String
 }

 type Refresh {
   mode: String!
 }
`
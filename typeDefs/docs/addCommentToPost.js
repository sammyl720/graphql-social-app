module.exports = `
Add comment to a 'Post' type \n
required fields: (postId: ID!, text: String)\n
option fields: (images: [String], public:Boolean)
a Authorization header with a 'Bearer <token>' value is required to access this mutation\n
returns the created Comment object on success\n
return an Error object on failure\n
`
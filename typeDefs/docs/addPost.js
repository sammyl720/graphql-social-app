module.exports = `
add a post with required data field of text (String)\n
additional optional fields:\n
\t. public: Boolean (indicates if the post can be viewed by anyone or not) default: true\n
\t. images: [String] (an array of url/base64 images) will change to a more dynamic field in the future\n
a Authorization header with a 'Bearer <token>' value is required to access this mutation\n
returns the created Post object on success\n
return an Error object on failure\n
`
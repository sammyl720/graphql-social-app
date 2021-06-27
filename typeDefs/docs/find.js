module.exports = `
find users, posts and comments with required text field (String) and optional limit field (Int)\n

a Authorization header with a 'Bearer <token>' value is required to access this mutation\n
returns a FindResults object with arrays of users, posts, comments\n
`
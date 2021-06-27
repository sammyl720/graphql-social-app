module.exports = `
like or unlike a given post\n
required field: (id:ID!) - post id\n
a Authorization header with a 'Bearer <token>' value is required to access this mutation\n
returns a Success object with a status field on success\n
return an Error object on failure\n
`
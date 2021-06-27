module.exports = `
approve a user follow request with required data field of userId(ID!)\n
side note: This only applies to users who have their profile private setting set to true\n
a Authorization header with a 'Bearer <token>' value is required to access this mutation\n
returns a Success object with a status field on success\n
return an Error object on failure\n
`
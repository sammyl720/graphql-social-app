module.exports = `
Request to reset your password (email: String!)\n
and email will be sent with a link to reset password\n
returns a Success object (with a status field) on Success .\n
returns a Error object on error\n
Error has a message field and a errors array field\n
`
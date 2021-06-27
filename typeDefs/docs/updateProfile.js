module.exports = `
update authenticated user's profile\n
all fields are optional\n
optional fields\n
\t name: String\n
\t gender:Gender  a enum 'option' of values(Male, Female, NonBinary, Unspecified)\n
\t profile_img: String (will update to a more dynamic type in future)\n
\t bio: String\n
\t private: Boolean
a Authorization header with a 'Bearer <token>' value is required to access this mutation
`
const { SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql');
const { User } = require('../models');

class EnsureAuth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      try {
        const { payload } = args[2];
        const errors = []
        if(!payload ||!payload?.id){
          console.log('LOGIN FIRST')
          errors.push('Please provide a token in the authorization header -> Bearer <TOKEN>')
          return {
            message: 'Login first to get token',
            errors
          }
        }

        let user = await User.findById(payload.id)
        if(!user){
          return {
            message: 'Couldn\'t retrieve user',
            errors: ["Couldn't retrieve user from database"]
          }
        }
        args[2].user = user
        const result = await resolve.apply(this, args);
        return result;
      } catch (error) {
        console.log(error)
        return {
          message: 'Something went wrong',
          errors: ['Something went wrong']
        }
      }
    };
  }
}

module.exports = EnsureAuth
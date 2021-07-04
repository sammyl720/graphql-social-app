const cookie = require('cookie');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { minute, week } = require('../../util/time');

module.exports = (parents, args, ctx) => {
  console.log(ctx.req.headers.cookie)
  return {
    mode: 'TESTING ROUTE'
  }
}
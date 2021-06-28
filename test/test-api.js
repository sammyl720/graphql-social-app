const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../index')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, "../", "test.env")})

chai.use(chaiHttp)

it("process node enviroment should be defined", function(done){
  expect(process.env.NODE_ENV).to.be.equal('TEST')
  done()
})

it('can sign up new user', async function(done) {
  let query =  "mutation {\n  signup(data: {email: \"john@example.com\", password: \"mypassword\", name: \"mike\"}) {\n    ... on Token {\n      token\n    }\n    ... on Error {\n      message\n      errors\n    }\n  }\n}\n"
  try {
    console.log('tests go here')
  } catch (error) {
    console.log(error)
    done()
  }
})
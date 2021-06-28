const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
require('dotenv').config()

const { MAIL_SMTP:smtp, MAIL_USERNAME:username, MAIL_PASSWORD: password, WEBSITE } = process.env
let poolConfig = `smtp://${username}:${password}@${smtp}/?pool-true`;
const options = {
  host: smtp,
  auth: {
    type: 'login',
    user: username,
    password
  }
}
let from = username;
let transporter = nodemailer.createTransport(poolConfig, { from })

console.log('Hello')
transporter.verify((error, success) => {
  if(error){
    console.log(error)
  } else {
    console.log(success)
    console.log('Server is ready to take our messages')
  }
})


module.exports = async function sendEmail(template, headers, variables){
  try {
    const html = await ejs.renderFile(__dirname + `/views/${template}.ejs`, variables)
    const info = await transporter.sendMail({...headers, html })
    console.log(info)
    return "E-mail sent"
  } catch (error) {
    console.log(error)
  }
}

const headers = {
  to: '"Sam" "sammyl720@gmail.com"', 
  subject: `Welcome to ${WEBSITE}`,
  text: 'Verify your account'
}
// sendEmail("welcome", headers, { user: { name: "Shmuel Leider" }, url: 'https://shmuelleider.com', website: WEBSITE })
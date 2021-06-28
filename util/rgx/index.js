const email = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/

const textRgx = () => {
  const emails = ['sam.leider@hotmail.com', 'dan21@aol.com']
  const notEmails = ['r2323@a', '@dafd.com', 'sam.com']
  console.log('~~~~ matches ~~~~')
  emails.forEach(e => {
    if(email.test(e)){
      console.log(`${e} is a valid email`)
    } else {
      console.log(`${e} is not a valid email`)
    }
  })
  console.log('~~~~ end matches ~~~~')
  console.log('~~~~ not matches ~~~~')
  notEmails.forEach(e => {
    if(email.test(e)){
      console.log(`${e} is a valid email`)
    } else {
      console.log(`${e} is not a valid email`)
    }
  })
  console.log('~~~~ end not matches ~~~~')
}

const isEmail = text => email.test(text)
module.exports = {
  isEmail
}
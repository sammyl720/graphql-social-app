
module.exports = {

  unix: (parent, args,ctx) => {
    let d = new Date(parent)
    console.log('uni', d.getTime())
    return d.getTime()
  },

  full_date: (parent, args, ctx) => {
    let d = new Date(parent)
    return d.toString()
  },

  utc: (parent) => {
    let d = new Date(parent)
    return d.toUTCString()
  },

  date: (parent) => {
    let d = new Date(parent)
    return d.toDateString()
  },

  time: (parent) => {
    let d = new Date(parent)
    return d.toTimeString()
  }
}
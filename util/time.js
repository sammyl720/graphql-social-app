const day = 1000 * 60 * 60 * 24;
const week = 7 * day;
const month = 30 * day;
const year = month * 12 + (5 * day); 

const getDateString = (offset) => {
  return new Date(Date.now() - offset).toDateString()
}


module.exports = {
  day,
  week,
  month,
  year,
  getDateString
}
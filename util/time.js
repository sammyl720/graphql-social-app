const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = hour * 24;
const week = 7 * day;
const month = 30 * day;
const year = month * 12 + (5 * day); 

const getDateString = (offset) => {
  return new Date(Date.now() - offset).toDateString()
}


module.exports = {
  minute,
  hour,
  day,
  week,
  month,
  year,
  getDateString
}
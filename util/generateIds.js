const chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']

const randomIndex = () => {
  return Math.floor(Math.random() * ( chars.length ))

}
const generateId = () => {
  let id = ''
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      id += chars[randomIndex()]
    }
    if(i == 3){
      break;
    }
    id += '-'
  }

  return id;
}

module.exports = {
  generateId
}
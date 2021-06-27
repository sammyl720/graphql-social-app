module.exports = {
  __resolveType(obj){
    if(obj.text){
      return 'Comment'
    }
    if(obj.message){
      return 'Error'
    }

    return null
  }
}
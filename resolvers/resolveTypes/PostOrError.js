module.exports = {
  __resolveType(obj){
    if(obj.text){
      return 'Post'
    }
    if(obj.message){
      return 'Error'
    }

    return null
  }
}
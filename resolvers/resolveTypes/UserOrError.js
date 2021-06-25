module.exports = {
  __resolveType(obj){
    if(obj.email){
      return 'User'
    }
    if(obj.message){
      return 'Error'
    }

    return null
  }
}

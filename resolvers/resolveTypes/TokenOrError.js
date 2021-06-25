module.exports = {
  __resolveType(obj){
    if(obj.token){
      return 'Token'
    }
    if(obj.message){
      return 'Error'
    }

    return null
  }
}
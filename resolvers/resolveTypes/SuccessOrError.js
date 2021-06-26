module.exports = {
  __resolveType(obj){
    if(obj.status){
      return 'Success'
    }
    if(obj.message){
      return 'Error'
    }

    return null
  }
}
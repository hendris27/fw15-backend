const jwt = require ("jsonwebtoken")
const errorHandler = require ("../helpers/errorHandler.helper")
const {APP_SECRET} =process.env

const autMiddleware = (request, response, next) =>{
  try{
    const {authorization: auth} = request.headers
    if(!auth && !auth?.startsWith("Bearer  ")){
      throw Error("unauthorized")
    }const token =auth.slice(7)
    request.user = jwt.verify(token, APP_SECRET)
    // request.user.id => id suer yang sedang login
    return next()
  }catch (err) {
    if (err) return errorHandler(err, response)
  }
}

module.exports = autMiddleware

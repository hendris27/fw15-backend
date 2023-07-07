const deviceTokenModel = require ("../models/deviceToken.model")
const errorHandler = require("../helpers/errorHandler.helper")


exports.saveToken = async (req, response)=>{
  try{
    const {id} = req.user
    const {token} = req.body
    const exists = await deviceTokenModel.findOneByToken(token)
    if(exists){
      await deviceTokenModel.updateUSerIdByToken(token, id)
    }else {
      await deviceTokenModel.insertToken(id, {token})

    }
    return response.json({
      success:true,
      message: "Token saved",
      results:{
        token
      }
    })
  }catch(err){
    if (err) return errorHandler(err, response)


  }
}

const changePasswordModel = require("../models/changePassword.model")
const errorHandler = require("../helpers/errorHandler.helper")
const argon = require ("argon2")

exports.changePassword = async (request, response) => {
    try{
        const {id} = request.user
        const user = await changePasswordModel.findOneByUserId(id)
        const {oldPassword, newPassword, confirmNewPassword} = request.body

        const verify = argon.verify(user.password, oldPassword)
        if (!verify) {
            throw Error ("wrong_credentials")
        }
        if (newPassword !== confirmNewPassword) {
            throw Error ("password_unmatch")
        }

        const data = {
            password: await argon.hash(newPassword)
        }
        const userData = await changePasswordModel.changePasswordUser(user.id, data)
        if(!userData){
            throw Error ("change_Password_failed, try_again!")
        }
        return response.json({
            succes : true,
            message :"change password succes",
            results: userData
        })
      
    }catch (err) {
        if (err) return errorHandler(err, response)
    }
}

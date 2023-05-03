const usersModel = require("../models/users.model")
const errorHandler = require("../helpers/errorHandler.helper")
const argon = require ("argon2")

exports.index = async (request, response) => {
    try{
        const {id} = request.user
        const user = await usersModel.findOne(id)
        const {oldPassword, newPassword, confirmNewPassword} = request.body

        const verify =await argon.verify(user.password, oldPassword)
        if (!verify) {
            throw Error ("wrong_credentials")
        }
        if (newPassword === oldPassword) {
            throw Error ("cant_same_password")
        }

        if (newPassword !== confirmNewPassword) {
            throw Error ("password_unmatch")
        }
        

        const data = {
            password: await argon.hash(newPassword)
        }
        const updatePassword = await usersModel.update(user.id, data)
        if(!updatePassword){
            throw Error ("change_Password_failed, try_again!")
        }
        return response.json({
            succes : true,
            message :"change password succes",
            results: updatePassword
        })
      
    }catch (err) {
        if (err) return errorHandler(err, response)
    }
}

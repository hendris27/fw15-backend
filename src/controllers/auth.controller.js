const userModel = require("../models/users.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require ("jsonwebtoken")
const {APP_SECRET} = process.env
const argon = require ("argon2")

exports.login = async (request, response) =>  {
    try{
        const {email, password} =request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error ("wrong_credentials")
        }
        const verify = await argon.verify(user.password, password)
        if (!verify) {
            throw Error ("wrong_credentials")
        }
        const token =jwt.sign({id : user.id}, APP_SECRET)
        return response.json({
            succes : true,
            message :"Login Succes",
            results : {token}
        })
        
    }catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.register = async (request, response) => {
    try{
        const {password, confirmPassword} = request.body
        if(password !== confirmPassword){
            throw Error ("password unmatch")
        }
        const hash = await argon.hash(password)
        const data = {
            ...request.body, password : hash
        }
        const user = await userModel.insert(data)
        const token =jwt.sign({id : user.id}, APP_SECRET)
        return response.json({
            succes : true,
            message :"Register Succes",
            results : {token}
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }

}

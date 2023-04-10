
const userModel = require("../models/users.model")
const errorHandler = require ("../helpers/errorHandler.helper")


exports.getAllUsers= async(request, response)=>{
    const data = await userModel.findAll()
    return response.json({ 
        succes : true,
        message : "list of all users",
        results : data
    })
}

exports.getOneUser= async(request, response)=>{
    try {
        const data = await userModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail users",
            results : data
        })
        }
    
        return response.status(404).json({
            succes : false,
            message : "Error: user not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}



exports.createUser = async (request, response) =>{
    
    try{  
        const dataEmail= request.body.email
        const dataPassword=request.body.password
        if (dataEmail == "" && dataPassword =="") {
            throw Error("empty_field")
        }
        if (!dataEmail.includes("@")) {
            throw Error("email_format")
        }
        if (dataPassword.length < 8) {
            throw Error("password_format")
        }
        const data = await userModel.insert(request.body) 
        return response.json({
            succes: true,
            message:`create user ${request.body.email} succesfully`,
            results: data
            
        })
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
    
       
}

exports.updateUser =async (request, response) =>{
    try{
        const data = await userModel.update(request.params.id, request.body)
        if(data){
            return response.json({
                succes: true,
                message:"Update user succesfully",
                results: data
            })
        } return response.status(404).json({
            succes : false,
            message : "Error: user not found",
        })
    }
   
    catch (err) {
        if (err) return errorHandler(err, response)
    }
   
}

exports.deleteUser = async (request, response) => {
    try {
        const data = await userModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: `Users ${request.params.id} deleted successfully`,
                results: data,
            })
        }
            
        return response.status(404).json({
            success: false,
            message: "Users not found",
       
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

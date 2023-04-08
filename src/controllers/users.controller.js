const userModel = require("../models/users.model")

exports.getAllUsers= async(request, response)=>{
    const data = await userModel.findAll()
    return response.json({
        succes : true,
        message : "list of all users",
        results : data
    })
}

exports.getOneUser= async(request, response)=>{
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
exports.createUser = async (request, response) =>{
    try{      
        const data = await userModel.insert(request.body)
        if (request.body.email !== "string" || !request.body.email.includes("@") || !request.body.email.includes(".") ||  request.body.email === "") {
            return response.status(400).json({
                success: false,
                message: "Error: Invalid email format" })
        }
        return response.json({
            succes: true,
            message:`create user ${request.body.email} succesfully`,
            results: data
        })
    } catch (err){
        if(err.message.includes("duplicate key"))
            return response.status(409).json({
                succes: false,
                message: "Error : email already used!",
            })
      
    } return response.status(500).json({
        succes: false,
        message: "Error : Internal server error",
    })
       
}

exports.updateUser =async (request, response) =>{
    const data = await userModel.update(request.params.id, request.body)
    if(data){
        return response.json({
            succes: true,
            message:"Update user succesfully",
            results: data
        })
    }
        
    return response.status(404).json({
        succes: false,
        message:"Error :User not found",
    })
}

exports.deleteUser = async (request, response) =>{
    const data = await userModel.destroy(request.params.id)
    if (data){
        return response.json({
            succes: true,
            message:"delete user succesfully",
            results:data
            
        })
    }
    return response.status(404).json({
        succes: false,
        message:"delete user succesfully",
    })
}

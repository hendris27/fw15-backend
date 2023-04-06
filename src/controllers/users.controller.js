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
    const data = await userModel.insert(request.body)
    return response.json({
        succes: true,
        message:`create user ${request.body.email} succesfully`,
        results: data
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
    if(data){
        return response.json({
            succes: true,
            message:"delete user succesfully",
            results :data
        })
    }
    return response.status(404).json({
        succes: true,
        message:"Data user not found",
    })
}

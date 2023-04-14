
const userModel = require("../../models/users.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
const argon = require ("argon2")
// const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAllUsers= async(request, response)=>{
    try{
        const data = await userModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all users",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }

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
     

        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body, password: hash
        }
      
        const user = await userModel.insert(data)
        return response.json({
            succes: true,
            message:`create user ${request.body.email} succesfully`,
            results: user
            
        })
    } catch (err) {
        // fileRemover(request.file)

        if (err) return errorHandler(err, response)
    }
}

exports.updateUser =async (request, response) =>{
    try{
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password= await argon.hash(request.body.password)

        }
        const user = await userModel.update(request.params.id, data)
        if(user) {
            return response.json({
                succes: true,
                message:"Update user succesfully",
                results: user
            })
        }
        throw Error ("validator")
    }   
    catch (err) {
        // fileRemover(request.file)

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

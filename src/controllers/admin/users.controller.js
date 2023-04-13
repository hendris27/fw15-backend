
const userModel = require("../../models/users.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
const argon = require ("argon2")


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
        // const {fullName, email, password}=request.body
        // const validasiAngka = /[0-9]/
        // const validasiHuruf = /[a-zA-Z]/
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              
        // if (email == "" || password == "" || fullName == "") {
        //     throw Error("empty_field")
        // }
        // if (email == "" && password == "" && fullName == "") {
        //     throw Error("empty_field")
        // }
        // if (!email.includes("@") || !email.match(emailRegex) || email.startsWith("@") || email.endsWith("@"))  {
        //     throw Error("email_format")
        // }
        // if ((email.match(/@/g) || []).length > 1)  {
        //     throw Error("email_format")
        // }
        // if (password === fullName  || fullName === password) {
        //     throw Error("not_same_format")
        // }
        // if (!validasiHuruf.test(password) || !validasiAngka.test(password)) {
        //     throw Error("password_symbol_format")
        // }
        // if (password.length <= 5) {
        //     throw Error("password_format")
        // }
        // if (validasiAngka.test(fullName) ) {
        //     throw Error("name_format")
        // }

        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body, password : hash
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const user = await userModel.insert(data)
        return response.json({
            succes: true,
            message:`create user ${request.body.email} succesfully`,
            results: user
            
        })
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.updateUser =async (request, response) =>{
    try{
        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body, password : hash
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

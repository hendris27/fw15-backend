
const patnersModel = require("../../models/patners.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAllpatners= async(request, response)=>{
    try{
        const data = await patnersModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all patners",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.getOnepatners= async(request, response)=>{
    try {
        const data = await patnersModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail patners",
            results : data
        })
        }
        return response.status(404).json({
            succes : false,
            message : "Error:patners not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}



exports.createpatners = async (request, response) =>{
    
    try{  
        // const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body}

        if(request.file){
            data.picture =request.file.filename
        }

        const patners = await patnersModel.insert(data)
        return response.json({
            succes: true,
            message:"create patners succesfully",
            results: patners
            
        })
    } catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
}

exports.updatepatners =async (request, response) =>{
    try{
        const data = {
            ...request.body
        }
        // if(request.body.password){
        //     data.password= await argon.hash(request.body.password)
        // }
        if(request.file){
            data.picture =request.file.filename
        }
        const patners = await patnersModel.update(request.params.id, data)
        if(patners) {
            return response.json({
                succes: true,
                message:"Update patners succesfully",
                results: patners
            })
        }
        throw Error ("update_failed")
    }   
    catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
   
}

exports.deletepatners = async (request, response) => {
    try {
        const data = await patnersModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "patners  deleted successfully",
                results: data,
            })
        }
            
        return response.status(404).json({
            success: false,
            message: "patners not found",
       
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

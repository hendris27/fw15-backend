
const citiesModel = require("../../models/cities.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAllCities= async(request, response)=>{
    try{
        const data = await citiesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all Cities",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.getOneCities= async(request, response)=>{
    try {
        const data = await citiesModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail Cities",
            results : data
        })
        }
        return response.status(404).json({
            succes : false,
            message : "Error:Cities not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}



exports.createCities = async (request, response) =>{
    
    try{  
        const data = {
            ...request.body}

        if(request.file){
            data.picture =request.file.filename
        }

        const Cities = await citiesModel.insert(data)
        return response.json({
            succes: true,
            message:"create Cities succesfully",
            results: Cities
            
        })
    } catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
}

exports.updateCities =async (request, response) =>{
    try{
        const data = {
            ...request.body
        }
        
        if(request.file){
            data.picture =request.file.filename
        }
        const Cities = await citiesModel.update(request.params.id, data)
        if(Cities) {
            return response.json({
                succes: true,
                message:"Update profil succesfully",
                results: Cities
            })
        }
        throw Error ("update_Cities_failed")
    }   
    catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
   
}

exports.deleteCities = async (request, response) => {
    try {
        const data = await citiesModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Cities  deleted successfully",
                results: data,
            })
        }
            
        return response.status(404).json({
            success: false,
            message: "Cities not found",
       
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

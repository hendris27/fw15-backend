
const eventsModel = require("../../models/events.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAllEvents= async(request, response)=>{
    try{
        const data = await eventsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all events",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.getOneEvents= async(request, response)=>{
    try {
        const data = await eventsModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail Events",
            results : data
        })
        }
        return response.status(404).json({
            succes : false,
            message : "Error: Events not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}



exports.createEvents = async (request, response) =>{
    
    try{  
        // const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body}

        if(request.file){
            data.pictures =request.file.filename
        }

        const Events = await eventsModel.insert(data)
        return response.json({
            succes: true,
            message:"create events succesfully",
            results: Events
            
        })
    } catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
}

exports.updateEvents =async (request, response) =>{
    try{
        const data = {
            ...request.body
        }
        // if(request.body.password){
        //     data.password= await argon.hash(request.body.password)
        // }
        if(request.file){
            data.pictures =request.file.filename
        }
        const Events = await eventsModel.update(request.params.id, data)
        if(Events) {
            return response.json({
                succes: true,
                message:"Update events succesfully",
                results: Events
            })
        }
        throw Error ("update_event_failed")
    }   
    catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
   
}

exports.deleteEvents = async (request, response) => {
    try {
        const data = await eventsModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: "Events deleted successfully",
                results: data,
            })
        }
            
        return response.status(404).json({
            success: false,
            message: "Events not found",
       
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

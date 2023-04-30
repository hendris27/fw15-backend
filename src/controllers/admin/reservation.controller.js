
const eventModel = require("../../models/events.model")
const usersModel = require("../../models/users.model")
const paymentModel = require("../../models/paymentMethod.model")
const reservationModel = require("../../models/reservation.model")
const errorHandler = require ("../../helpers/errorHandler.helper")


exports.getAllreservation= async(request, response)=>{
    try{
        const data = await reservationModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all reservation ",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }

}

exports.getOnereservation= async(request, response)=>{
    try {

        const data = await reservationModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail reservation ",
            results : data
        })
        }
    
        return response.status(404).json({
            succes : false,
            message : "Error: reservation not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.createreservation = async (request, response) =>{
    
    try{ 


        const EventId = await eventModel.findOne(request.body.eventId)
        if(!EventId){
            throw Error ("eventId_not_found!")
        }
        const usersId = await usersModel.findOne(request.body.userId)
        if(!usersId){
            throw Error ("userId_not_found!")
        }
        const paymentId = await paymentModel.findOne(request.body.paymentMethodId)
        if(!paymentId){
            throw Error ("Payment_not_found!")
        }
        const data = {
            ...request.body
        }
        const eventCategories = await reservationModel.insert(data)
        if(!eventCategories){
            throw Error ("create_eventcategory_failed")
        }
      
        return response.json({
            succes: true,
            message:"create reservation succesfully",
            results: eventCategories
            
        })
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.updatereservation =async (request, response) =>{
    try{
        const EventId = await eventModel.findOne(request.body.eventId)
        if(!EventId){
            throw Error ("eventId_not_found!")
        }
        const usersId = await usersModel.findOne(request.body.userId)
        if(!usersId){
            throw Error ("userId_not_found!")
        }
        const paymentId = await paymentModel.findOne(request.body.paymentMethodId)
        if(!paymentId){
            throw Error ("Payment_not_found!")
        }

        const data = {
            ...request.body
        }
       
        const reservation = await reservationModel.update(request.params.id, data)
        if(reservation) {
            return response.json({
                succes: true,
                message:"Update reservation succesfully",
                results: reservation
            })
        }
        throw Error ("validator")
    }   
    catch (err) {
        // fileRemover(request.file)

        if (err) return errorHandler(err, response)
    }
}
exports.deletereservation = async (request, response) => {
    try {
        const data = await reservationModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: `reservation  ${request.params.id} deleted successfully`,
                results: data,
            })
        } 
        return response.status(404).json({
            success: false,
            message: "reservation not found",
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}


const reservationModel = require("../../models/reservation.model")
const sectionModel = require("../../models/reservationSection.model")
const reservationTicketsModel = require("../../models/reservationTickets.model")
const errorHandler = require ("../../helpers/errorHandler.helper")


exports.getAllreservationTickets= async(request, response)=>{
    try{
        const data = await reservationTicketsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all Reservation Tickets",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }

}

exports.getOnereservationTickets= async(request, response)=>{
    try {

        const data = await reservationTicketsModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail Reservation Tickets",
            results : data
        })
        }
    
        return response.status(404).json({
            succes : false,
            message : "Error: Reservation Tickets not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.createreservationTickets = async (request, response) =>{
    
    try{ 
        
        const reservationId = await reservationModel.findOne(request.body.reservationId)
        if(!reservationId){
            throw Error ("reservationId_not_found!")
        }
        const sectionId = await sectionModel.findOne(request.body.sectionId)
        if(!sectionId){
            throw Error ("sectionId_not_found!")
        }
     
        const data = {
            ...request.body
        }
        const reservationTickets = await reservationTicketsModel.insert(data)
        if(!reservationTickets){
            throw Error ("create_resservation Tickeet_failed")
        }
    
        return response.json({
            succes: true,
            message:"create Reservation Tickets succesfully",
            results: reservationTickets
            
        })
    } catch (err) {
       
        if (err) return errorHandler(err, response)
    }
}

exports.updatereservationTickets =async (request, response) =>{
    try{
        const reservationId = await reservationModel.findOne(request.body.reservationId)
        if(!reservationId){
            throw Error ("reservationId_not_found!")
        }
        const sectionId = await sectionModel.findOne(request.body.sectionId)
        if(!sectionId){
            throw Error ("sectionId_not_found!")
        }
        const data = {
            ...request.body
        }
       
        const reservationTickets = await reservationTicketsModel.update(request.params.id, data)
        if(reservationTickets) {
            return response.json({
                succes: true,
                message:"Update Reservation Tickets succesfully",
                results: reservationTickets
            })
        }
        throw Error ("validator")
    }   
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}
exports.deletereservationTickets = async (request, response) => {
    try {
        const data = await reservationTicketsModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: `Reservation Ticketss ${request.params.id} deleted successfully`,
                results: data,
            })
        } 
        return response.status(404).json({
            success: false,
            message: "Reservation Tickets not found",
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

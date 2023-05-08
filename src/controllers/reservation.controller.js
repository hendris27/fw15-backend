const fileRemover = require("../helpers/fileRemover.helper")
const reservationModel = require("../models/reservation.model")
const reservationTicketsModel = require("../models/reservationTickets.model")
const reservationSectionModel = require("../models/reservationSection.model")
const errorHandler = require("../helpers/errorHandler.helper")


exports.createreservations = async (request, response) =>{
    try{
        const {id} = request.user
        const status = 1
        const paymentMethod = 5

        const sectionId = await reservationSectionModel.findOne(request.body.sectionId)
        if(!sectionId){
            throw Error ("sectionId not found")
        }


        const data = {...request.body,
            userId:id,
            statusId:status,
            paymentMethodId:paymentMethod        
        }
    
        const reservation = await reservationModel.insert(data)
        if(!reservation){
            throw Error ("create reservation failed")
        }


        const dataTickets={...request.body,
            reservationId:reservation.id,
        }
        const reservationTickets = await reservationTicketsModel.insert(dataTickets)
        
        

        const section = reservationTickets.sectionId
        const quantity = reservationTickets.quantity

        const trueSection = await reservationSectionModel.findOne(section)
        const price = trueSection.price
        const sections = trueSection.name
        // console.log(typeof(price))
        // console.log(typeof(price))
        const totalPayment = "Rp." + parseInt(price) * parseInt(quantity) +",-"

        // console.log(totalPayment)
        const results = {
            sections, quantity, totalPayment
        }
        return response.json({
            succes: true,
            message:"create reservation succesfully",
            results: results
        })

       
    } 
    
    catch (err) {
        fileRemover(request.file)
        if (err) return errorHandler(err, response)
    }
}


const wishlistModel = require("../../models/wishlist.model")
const eventModel = require("../../models/events.model")
const usersModel = require("../../models/users.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
// const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAllwishlist= async(request, response)=>{
    try{
        const data = await wishlistModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of all wishlist ",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }

}

exports.getOnewishlist= async(request, response)=>{
    try {

        const data = await wishlistModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail wishlist ",
            results : data
        })
        }
    
        return response.status(404).json({
            succes : false,
            message : "Error: wishlist not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.createwishlist = async (request, response) =>{
    
    try{ 
        

        const wishlistEvent = await eventModel.findOne(request.body.eventId)
        if(!wishlistEvent){
            throw Error ("eventId_not_found!")
        }
        const wishlistUserId = await usersModel.findOne(request.body.userId)
        if(!wishlistUserId){
            throw Error ("userId_not_found!")
        }
        const createwishlist = await wishlistModel.createById({
            eventId:request.body.eventId,
            userId:request.body.userId
        })
        if(!createwishlist){
            throw Error ("create_wishlist_failed")
        }

        return response.json({
            succes:true,
            message:"Add wishlist succesfully",
            results: createwishlist
        })

    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.updatewishlist =async (request, response) =>{
    try{ const wishlistEvent = await eventModel.findOne(request.body.eventId)
        if(!wishlistEvent){
            throw Error ("eventId_not_found!")
        }
        const wishlistUserId = await usersModel.findOne(request.body.userId)
        if(!wishlistUserId){
            throw Error ("userId_not_found!")
        }
        const data = {
            ...request.body
        }

        const createwishlist = await wishlistModel.createById(data)
        if(!createwishlist){
            throw Error ("create_wishlist_failed")
        }

        const wishlist = await wishlistModel.update(request.params.id, data)
        if(wishlist) {
            return response.json({
                succes: true,
                message:"Update wishlist succesfully",
                results: wishlist
            })
        }
        throw Error ("validator")
    }   
    catch (err) {
      
        if (err) return errorHandler(err, response)
    }
}
exports.deletewishlist = async (request, response) => {
    try {
        const data = await wishlistModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: `wishlist  ${request.params.id} deleted successfully`,
                results: data,
            })
        } 
        return response.status(404).json({
            success: false,
            message: "wishlist not found",
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

// const fileRemover = require("../helpers/fileRemover.helper")
const wishlistModel = require("../models/wishlist.model")
const eventModel = require("../models/events.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getWishlist = async (req, res) => {
    try{
        const {id} =req.user
        const wishlist = await wishlistModel.findOneById(id)
        if(!wishlist){
            throw Error ("wishlist Not Found!")
        }
        return res.json({
            succes :true,
            message : "Detail wishlist",
            results:wishlist
        })
    }catch (err) {
        if (err) return errorHandler(err, res)
    }

}
exports.createWishlist = async (req, res) => {
    try{
       
        const wishlistEvent = await eventModel.findOne(req.body.eventId)
        if(!wishlistEvent){
            throw Error ("wishlistEvent not found!")
        }
        const updatedwishlist = await wishlistModel.createById({
            eventId:req.body.eventId,
            userId:req.user.id

        })
        if(!updatedwishlist){
            throw Error ("create_wishlist_failed")
        }

        return res.json({
            succes:true,
            message:"Add wishlist succesfully",
            results: updatedwishlist
        })
    } catch (err) {
        if (err) return errorHandler(err, res)
    }

}

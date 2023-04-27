// const fileRemover = require("../helpers/fileRemover.helper")
const wishlistModel = require("../models/wishlist.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getWishlist = async (req, res) => {
    try{
        
        const wishlist = await wishlistModel.findOneById()
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
        const {id} = req.body
        const data = {
            ...req.body
        }
        const updatedwishlist = await wishlistModel.createById(id, data)
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

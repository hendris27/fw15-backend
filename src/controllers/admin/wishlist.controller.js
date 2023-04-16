
const wishlistModel = require("../../models/wishlist.model")
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
        // const hash = await argon.hash(request.body.password)
        // const data = {
        //     ...request.body, password: hash
        // }
        const data = {
            ...request.body
        }
        const wishlist = await wishlistModel.insert(data)
        return response.json({
            succes: true,
            message:"create wishlist succesfully",
            results: wishlist
            
        })
    } catch (err) {
        // fileRemover(request.file)

        if (err) return errorHandler(err, response)
    }
}

exports.updatewishlist =async (request, response) =>{
    try{
        const data = {
            ...request.body
        }
        // if(request.body.password){
        //     data.password= await argon.hash(request.body.password)

        // }
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
        // fileRemover(request.file)

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

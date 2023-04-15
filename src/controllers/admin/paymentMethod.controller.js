
const paymentMethodModel = require("../../models/paymentMethod.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
// const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAllpaymentMethod= async(request, response)=>{
    try{
        const data = await paymentMethodModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({ 
            succes : true,
            message : "list of payment method",
            results : data
        })
    }catch (err) {
        if (err) return errorHandler(err, response)
    }

}

exports.getOnepaymentMethod= async(request, response)=>{
    try {

        const data = await paymentMethodModel.findOne(request.params.id)
        if(data){return response.json({
            succes : true,
            message : "Detail payment method",
            results : data
        })
        }
    
        return response.status(404).json({
            succes : false,
            message : "Error: payment method not found",
        })
    }
    catch (err) {
        if (err) return errorHandler(err, response)
    }
}

exports.createpaymentMethod = async (request, response) =>{
    
    try{ 
        // const hash = await argon.hash(request.body.password)
        // const data = {
        //     ...request.body, password: hash
        // }
        const data = {
            ...request.body
        }
        const paymentMethod = await paymentMethodModel.insert(data)
        return response.json({
            succes: true,
            message:"create payment method succesfully",
            results: paymentMethod
            
        })
    } catch (err) {
        // fileRemover(request.file)

        if (err) return errorHandler(err, response)
    }
}

exports.updatepaymentMethod =async (request, response) =>{
    try{
        const data = {
            ...request.body
        }
        // if(request.body.password){
        //     data.password= await argon.hash(request.body.password)

        // }
        const paymentMethod = await paymentMethodModel.update(request.params.id, data)
        if(paymentMethod) {
            return response.json({
                succes: true,
                message:"Update payment method succesfully",
                results: paymentMethod
            })
        }
        throw Error ("validator")
    }   
    catch (err) {
        // fileRemover(request.file)

        if (err) return errorHandler(err, response)
    }
}
exports.deletepaymentMethod = async (request, response) => {
    try {
        const data = await paymentMethodModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                message: `payment method ${request.params.id} deleted successfully`,
                results: data,
            })
        } 
        return response.status(404).json({
            success: false,
            message: "payment method not found",
        })
        
    } catch (err) {
        if (err) return errorHandler(err, response)
    }
}

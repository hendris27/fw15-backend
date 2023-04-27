const fileRemover = require("../helpers/fileRemover.helper")
const eventModel = require("../models/events.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.createEvent = async (req, res) => {
    try{
        const {id} = req.user
        const user = await eventModel.findOneByUserId(id)
        const data = {
            ...req.body
        }
        if(req.file){
            if(user.picture){
                fileRemover({filename:user.picture})
            }
            data.picture = req.file.filename
        }
   
        const event = await eventModel.updateById(id, data)
        if(!event){
            throw Error ("update_event_failed")
        }

        return res.json({
            succes:true,
            message:"update event succesfully",
            results: event
        })
    } catch (err) {
        if (err) return errorHandler(err, res)
    }
 
}
exports.getEvent = async (req, res) => {
    try{
        const {id} = req.body
        const event = await eventModel.findOneById(id)
        if(!event){
            throw Error ("event Not Found!")
        }
        return res.json({
            succes :true,
            message : "Detail Event",
            results:event
        })
    }catch (err) {
        if (err) return errorHandler(err, res)
    }

}
exports.updateEvent = async (req, res) => {
    try{
        const {id} = req.user
        const event = await eventModel.findOneByUserId(id)
        if(!event){
            throw Error ("event Not Found!")
        }
        return res.json({
            succes :true,
            message : "Detail Profle",
            results:event
        })
    }catch (err) {
        if (err) return errorHandler(err, res)
    }

}
  

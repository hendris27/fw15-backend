const fileRemover = require("../helpers/fileRemover.helper")
const reservationModel = require("../models/reservations.model")
const cityModel = require("../models/cities.model")
// const categoryModel = require("../models/categories.model")
const errorHandler = require("../helpers/errorHandler.helper")


exports.createEvents = async (request, response) =>{
  try{
      const {id} = request.user

      const data = {
          ...request.body, createdBy:id}
      const dataNew = {
          ...data
      }
      // return    console.log(request.file)
      if(request.file){
          data.picture = request.file.filename
      }
      // return console.log(dataNew)
      const cityId = await cityModel.findOnecity(data.cityId)
      if(!cityId){
          throw Error ("cityId_not_found!")
      }
    
      // const categoryId = await categoryModel.findOneCategory(data.categoryId)
      // if(!categoryId){
      //     throw Error ("categoryId_not_found!")
      // }
    
      const Events = await eventModel.createEvents(dataNew)
      if(!Events){
          throw Error ("create events failed")
      }
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

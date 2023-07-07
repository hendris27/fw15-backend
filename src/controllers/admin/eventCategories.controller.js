
const eventCategoriesModel = require("../../models/eventCategories.model")
const eventModel = require("../../models/events.model")
const categoryModel = require("../../models/categories.model")
const errorHandler = require ("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
// const fileRemover = require ("../../helpers/fileRemover.helper")


exports.getAlleventCategories= async(request, response)=>{
  try{
    const data = await eventCategoriesModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({ 
      succes : true,
      message : "list of all event Categories",
      results : data
    })
  }catch (err) {
    if (err) return errorHandler(err, response)
  }

}

exports.getOneeventCategories= async(request, response)=>{
  try {

    const data = await eventCategoriesModel.findOne(request.params.id)
    if(data){return response.json({
      succes : true,
      message : "Detail event Categories",
      results : data
    })
    }
    
    return response.status(404).json({
      succes : false,
      message : "Error: event Categories not found"
    })
  }
  catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.createeventCategories = async (request, response) =>{
    
  try{
    const EventId = await eventModel.findOne(request.body.eventId)
    if(!EventId){
      throw Error ("eventId_not_found!")
    }
    const categoriesId = await categoryModel.findOne(request.body.categoryId)
    if(!categoriesId){
      throw Error ("categoryId_not_found!")
    }
    const data ={
      ...request.body
    }
    const eventCategories = await eventCategoriesModel.insert(data)
    if(!eventCategories){
      throw Error ("create_eventcategory_failed")
    }
    return response.json({
      succes: true,
      message:"create event Categories succesfully",
      results: eventCategories
            
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.updateeventCategories =async (request, response) =>{
  try{
    const EventId = await eventModel.findOne(request.body.eventId)
    if(!EventId){
      throw Error ("eventId_not_found!")
    }
    const categoriesId = await categoryModel.findOne(request.body.categoryId)
    if(!categoriesId){
      throw Error ("categoryId_not_found!")
    }
    const data = {
      ...request.body
    }
    
    const eventCategories = await eventCategoriesModel.update(request.params.id, data)
    if(!eventCategories) {
      throw Error ("update event category failed!")
    }
    return response.json({
      succes: true,
      message:"Update event Category succesfully",
      results: eventCategories
    })
      
  }   
  catch (err) {
    // fileRemover(request.file)

    if (err) return errorHandler(err, response)
  }
}
exports.deleteeventCategories = async (request, response) => {
  try {
    const data = await eventCategoriesModel.destroy(request.params.id)
    if(data){
      return response.json({
        success: true,
        message: `event Categoriess ${request.params.id} deleted successfully`,
        results: data
      })
    } 
    return response.status(404).json({
      success: false,
      message: "event Categories not found"
    })
        
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

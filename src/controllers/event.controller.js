// const fileRemover = require("../helpers/fileRemover.helper")
const eventModel = require("../models/events.model")
const cityModel = require("../models/cities.model")
const deviceTokenModel = require("../models/deviceToken.model")
// const categoryModel = require("../models/categories.model")
const errorHandler = require("../helpers/errorHandler.helper")
const admin = require ("../helpers/firebase")
const categoryModel = require("../models/categories.model")
const eventCategoryModel = require("../models/eventCategories.model")

exports.createEvents = async (request, response) => {
  try {
    const { id } = request.user

    const data = {
      ...request.body,
      createdBy: id
    }
   
    if (request.file) {
      data.picture = request.file.path
    }
    const listToken = await deviceTokenModel.findAll(1,1000)
    const message = listToken.map(item => ({token: item.token, notification:{title:"there is new event", body:`${request.body.tittle} will be held at ${request.body.date}, check it out!` }}))
    const messaging = admin.messaging()
    messaging.sendEach(message)
   
    const cityId = await cityModel.findOnecity(data.cityId)
    if (!cityId) {
      throw Error("cityId_not_found!")
    }
    const categoriesId = await categoryModel.findOne(request.body.categoryId)
    if(!categoriesId){

      throw Error ("categoryId_not_found!")
    }
    console.log(data)
    const Events = await eventModel.createEvents(data)
    const dataCategoriesEvent = {
      eventId: Events.id, categoryId: data.categoryId
    }
    await eventCategoryModel.insert(dataCategoriesEvent)
    if (!Events) {
      throw Error("create events failed")
    }
    return response.json({
      succes: true,
      message: "create events succesfully",
      results: Events
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}
exports.updateEvent = async (request, response) => {
  try {
    const { id } = request.user
    const data = {
      ...request.body,
      createdBy: id
    }
   
    const user = await eventModel.findOneByIdAndUserId(request.params.id, id)
    console.log(user)
    const cityId = await cityModel.findOnecity(data.cityId)
    if (!cityId) {
      throw Error("cityId_not_found!")
    }
    if (request.file) {
      if (data.picture) {
        // fileRemover({ filename: user.picture })
      }
      data.picture = request.file.path

    }

    const Events = await eventModel.update(request.params.id, data)
    if (Events) {
      return response.json({
        succes: true,
        message: "Update events succesfully",
        results: Events
      })
    }
    throw Error("update_event_failed")
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params
    const data = await eventModel.findOneById(id)
    if (!data) {
      throw Error("event Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail Event",
      results: data
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

exports.getOwnedEvent = async (req, res) => {
  try {
    const { id } = req.user
    const event = await eventModel.findOwnedEvent(id)
    if (!event) {
      throw Error("event Not Found!")
    }
    return res.json({
      succes: true,
      message: "Owned Event",
      results: event
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

exports.getDetailEvent = async (req, res) => {
  try {
    const { id } = req.user
    console.log(req.params.id)
    console.log(id)
    const event = await eventModel.findOneByIdAndUserId(req.params.id, id)
    // return console.log(id)
    if (!event) {
      throw Error("event Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail Event",
      results: event
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}
exports.getAllEvents = async (request, response) => {
  try {
    const data = await eventModel.findAllEvent(
      request.query.page,
      request.query.limit,
      request.query.searchByName,
      request.query.searchByCategory,
      request.query.searchByLocation,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      succes: true,
      message: "list of all events",
      results: data
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}
exports.deletedEvent = async (request, response) => {
  try {
    const data = await eventModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: "Deleted wishlist successfully",
        results: data
      })
    }

    return response.status(404).json({
      success: false,
      message: "wishlist not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

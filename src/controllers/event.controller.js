const fileRemover = require("../helpers/fileRemover.helper")
const eventModel = require("../models/events.model")
const cityModel = require("../models/cities.model")
// const categoryModel = require("../models/categories.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.createEvents = async (request, response) => {
  try {
    const { id } = request.user

    const data = {
      ...request.body,
      createdBy: id
    }
    const dataNew = {
      ...data
    }
    // return    console.log(request.file)
    if (request.file) {
      data.picture = request.file.filename
    }
    // return console.log(dataNew)
    const cityId = await cityModel.findOnecity(data.cityId)
    if (!cityId) {
      throw Error("cityId_not_found!")
    }

    // const categoryId = await categoryModel.findOneCategory(data.categoryId)
    // if(!categoryId){
    //     throw Error ("categoryId_not_found!")
    // }

    const Events = await eventModel.createEvents(dataNew)
    if (!Events) {
      throw Error("create events failed")
    }
    return response.json({
      succes: true,
      message: "create events succesfully",
      results: Events
    })
  } catch (err) {
    fileRemover(request.file)
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
    const dataNew = {
      ...data
    }
    const user = await eventModel.findOneById(id)

    const cityId = await cityModel.findOnecity(data.cityId)
    if (!cityId) {
      throw Error("cityId_not_found!")
    }
    if (request.file) {
      if (user.picture) {
        fileRemover({ filename: user.picture })
      }
      data.picture = request.file.filename
    }

    const Events = await eventModel.update(request.params.id, dataNew)
    if (Events) {
      return response.json({
        succes: true,
        message: "Update events succesfully",
        results: Events
      })
    }
    throw Error("update_event_failed")
  } catch (err) {
    fileRemover(request.file)
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

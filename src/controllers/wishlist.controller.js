// const fileRemover = require("../helpers/fileRemover.helper")
const wishlistModel = require("../models/wishlist.model")
const eventModel = require("../models/events.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getWishlist = async (req, res) => {
  try {
    const { id } = req.user
    const wishlist = await wishlistModel.findOneById(id)
    
    if (!wishlist) {
      throw Error("wishlist Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail All Wishlist",
      results: wishlist
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}
exports.getDetailWishlist = async (request, res) => {
  try {
    console.log(request.params)

    const { id } = request.user
    const wishlist = await wishlistModel.findOne(request.params.id, id)
    if (!wishlist) {
      return res.json({
        status: false
      })
    } else {
      return res.json({
        status: true
      })

    }
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}
exports.createWishlist = async (req, res) => {
  try {
    const { id } = req.user

    const data = {
      ...req.body,
      userId: id
    }
    const dataNew = {
      ...data
    }

    const wishlistEvent = await eventModel.findOne(req.body.eventId)
    if (!wishlistEvent) {
      throw Error("wishlistEvent not found!")
    }
    const updatedwishlist = await wishlistModel.createById(dataNew)
    if (!updatedwishlist) {
      throw Error("create_wishlist_failed")
    }

    return res.json({
      succes: true,
      message: "Add wishlist succesfully",
      results: updatedwishlist
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}
exports.delWishlist = async (request, response) => {
  try {
    const data = await wishlistModel.destroy(request.params.id)
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

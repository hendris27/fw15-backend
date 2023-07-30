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
    const { eventId } = req.body
    const dataWishlist = await eventModel.findOne(eventId)
    if (!dataWishlist) {
      throw Error("event_not_found")
    }
    const wishlistData = {
      eventId,
      userId: id
    }
    const checkDuplicate = await wishlistModel.findOneByUserIdAndEventId(
      id,
      eventId
    )
    if (checkDuplicate) {
      const deleteMyWishlist = await wishlistModel.deleteByUserIdAndEventId(
        id,
        eventId
      )
      return res.json({
        success: true,
        message: "deleted wishlist successfully!",
        results: deleteMyWishlist
      })
    }
    const wishlistEvent = await eventModel.findOne(req.body.eventId)
    if (!wishlistEvent) {
      throw Error("wishlistEvent not found!")
    }
    const updatedwishlist = await wishlistModel.createById(wishlistData)
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

exports.checkingWishlist = async (req, res) => {
  const { id } = req.user
  const event = req.query
  const eventId = event.eventId
  const checkWislist = await wishlistModel.findOneByUserIdAndEventId(
    id,
    eventId
  )
  if (!checkWislist) {
    return res.json({
      success: false,
      message: `Wishlist event ${eventId} by user ${id} not found`,
      results: false
    })
  }
  return res.json({
    success: true,
    message: `Wishlist event ${eventId} by user ${id} found`,
    results: true
  })
}

const reservationStatusModel = require("../../models/reservationStatus.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllreservationStatus = async (request, response) => {
  try {
    const data = await reservationStatusModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      succes: true,
      message: "list of all Reservation Status",
      results: data
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.getOnereservationStatus = async (request, response) => {
  try {
    const data = await reservationStatusModel.findOne(request.params.id)
    if (data) {
      return response.json({
        succes: true,
        message: "Detail Reservation Status",
        results: data
      })
    }

    return response.status(404).json({
      succes: false,
      message: "Error: Reservation Status not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.createreservationStatus = async (request, response) => {
  try {
    const data = {
      ...request.body
    }
    const reservationStatus = await reservationStatusModel.insert(data)
    return response.json({
      succes: true,
      message: "Create Reservation Status succesfully",
      results: reservationStatus
    })
  } catch (err) {
    // fileRemover(request.file)

    if (err) return errorHandler(err, response)
  }
}

exports.updatereservationStatus = async (request, response) => {
  try {
    const data = {
      ...request.body
    }
    // if(request.body.password){
    //     data.password= await argon.hash(request.body.password)

    // }
    const reservationStatus = await reservationStatusModel.update(
      request.params.id,
      data
    )
    if (reservationStatus) {
      return response.json({
        succes: true,
        message: "Update Reservation Status succesfully",
        results: reservationStatus
      })
    }
    throw Error("validator")
  } catch (err) {
    // fileRemover(request.file)

    if (err) return errorHandler(err, response)
  }
}
exports.deletereservationStatus = async (request, response) => {
  try {
    const data = await reservationStatusModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Rservation Status ${request.params.id} deleted successfully`,
        results: data
      })
    }
    return response.status(404).json({
      success: false,
      message: "Reservation Status Not Found!"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

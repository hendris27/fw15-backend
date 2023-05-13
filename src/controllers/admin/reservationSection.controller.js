const reservationSectionModel = require("../../models/reservationSection.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllreservationSection = async (request, response) => {
  try {
    const data = await reservationSectionModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      succes: true,
      message: "list of all Reservation Section",
      results: data
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.getOnereservationSection = async (request, response) => {
  try {
    const data = await reservationSectionModel.findOne(request.params.id)
    if (data) {
      return response.json({
        succes: true,
        message: "Detail reservation Section",
        results: data
      })
    }

    return response.status(404).json({
      succes: false,
      message: "Error: reservation Section not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.createreservationSection = async (request, response) => {
  try {
    const data = {
      ...request.body
    }
    const reservationSection = await reservationSectionModel.insert(data)
    return response.json({
      succes: true,
      message: "create reservation Section succesfully",
      results: reservationSection
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.updatereservationSection = async (request, response) => {
  try {
    const data = {
      ...request.body
    }

    const reservationSection = await reservationSectionModel.update(
      request.params.id,
      data
    )
    if (reservationSection) {
      return response.json({
        succes: true,
        message: "Update reservation Section succesfully",
        results: reservationSection
      })
    }
    throw Error("validator")
  } catch (err) {
    // fileRemover(request.file)

    if (err) return errorHandler(err, response)
  }
}
exports.deletereservationSection = async (request, response) => {
  try {
    const data = await reservationSectionModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `reservation Sections ${request.params.id} deleted successfully`,
        results: data
      })
    }
    return response.status(404).json({
      success: false,
      message: "reservation Section not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

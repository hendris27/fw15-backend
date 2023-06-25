// const fileRemover = require("../helpers/fileRemover.helper")
const sectionModel = require("../models/reservationSection.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getSection = async (req, res) => {
  try {
    const section = await sectionModel.findById()
    if (!section) {
      throw Error("section Not Found!")
    }
    return res.json({
      succes: true,
      message: "All section",
      results: section
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

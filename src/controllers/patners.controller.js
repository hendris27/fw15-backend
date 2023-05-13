// const fileRemover = require("../helpers/fileRemover.helper")
const patnersModel = require("../models/patners.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getPatners = async (req, res) => {
  try {
    const patners = await patnersModel.findById()
    if (!patners) {
      throw Error("Patners Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail Patners",
      results: patners
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

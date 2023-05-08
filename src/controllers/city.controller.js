// const fileRemover = require("../helpers/fileRemover.helper")
const cityModel = require("../models/cities.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getCity = async (req, res) => {
  try {
    const City = await cityModel.findCity()
    if (!City) {
      throw Error("City Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail City",
      results: City,
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

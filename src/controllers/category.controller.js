// const fileRemover = require("../helpers/fileRemover.helper")
const categoryModel = require("../models/categories.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getCategory = async (req, res) => {
  try {
    const category = await categoryModel.findCategory()
    if (!category) {
      throw Error("Category Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail Category",
      results: category,
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

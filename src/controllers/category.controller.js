// const fileRemover = require("../helpers/fileRemover.helper")
const categoryModel = require("../models/categories.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.getAllCategories = async (request, response) => {
  try {
    const data = await categoryModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      succes: true,
      message: "list of all categories",
      results: data
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

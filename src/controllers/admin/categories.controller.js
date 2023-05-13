const categoriesModel = require("../../models/categories.model")
const errorHandler = require("../../helpers/errorHandler.helper")

exports.getAllCategories = async (request, response) => {
  try {
    const data = await categoriesModel.findAll(
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

exports.getOneCategories = async (request, response) => {
  try {
    const data = await categoriesModel.findOne(request.params.id)
    if (data) {
      return response.json({
        succes: true,
        message: "Detail Categories",
        results: data
      })
    }

    return response.status(404).json({
      succes: false,
      message: "Error: Categories not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.createCategories = async (request, response) => {
  try {
    const data = {
      ...request.body
    }
    const Categories = await categoriesModel.insert(data)
    return response.json({
      succes: true,
      message: "create categories succesfully",
      results: Categories
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.updateCategories = async (request, response) => {
  try {
    const data = {
      ...request.body
    }

    const Categories = await categoriesModel.update(request.params.id, data)
    if (Categories) {
      return response.json({
        succes: true,
        message: "Update categories succesfully",
        results: Categories
      })
    }
    throw Error("validator")
  } catch (err) {
    // fileRemover(request.file)

    if (err) return errorHandler(err, response)
  }
}
exports.deleteCategories = async (request, response) => {
  try {
    const data = await categoriesModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Categoriess ${request.params.id} deleted successfully`,
        results: data
      })
    }
    return response.status(404).json({
      success: false,
      message: "categories not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

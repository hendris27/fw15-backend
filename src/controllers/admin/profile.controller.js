const profileModel = require("../../models/profile.model")
const errorHandler = require("../../helpers/errorHandler.helper")
// const argon = require ("argon2")
const fileRemover = require("../../helpers/fileRemover.helper")
const fs = require("fs")

exports.getAllProfile = async (request, response) => {
  try {
    const data = await profileModel.findAll(
      request.query.page,
      request.query.limit,
      request.query.search,
      request.query.sort,
      request.query.sortBy
    )
    return response.json({
      succes: true,
      message: "list of all profile users",
      results: data
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.getOneProfile = async (request, response) => {
  try {
    const data = await profileModel.findOne(request.params.id)
    if (data) {
      return response.json({
        succes: true,
        message: "Detail profile users",
        results: data
      })
    }
    return response.status(404).json({
      succes: false,
      message: "Error:Profile user not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.createProfile = async (request, response) => {
  try {
    const data = {
      ...request.body
    }

    if (request.file) {
      data.picture = request.file.filename
    }

    const profile = await profileModel.insert(data)
    return response.json({
      succes: true,
      message: "create profile users uccesfully",
      results: profile
    })
  } catch (err) {
    fileRemover(request.file)
    if (err) return errorHandler(err, response)
  }
}

exports.updateProfile = async (request, response) => {
  try {
    const data = {
      ...request.body
    }

    if (request.file) {
      const pictures = await profileModel.findPict(request.params.id)
      const fileName = `uploads/${pictures.picture}`
      if (fileName) {
        fs.unlink(fileName, (response, err) => {
          if (err) {
            return errorHandler(response, err)
          }
        })
      }

      data.picture = request.file.filename
    }

    const profile = await profileModel.update(request.params.id, data)
    if (profile) {
      return response.json({
        succes: true,
        message: "Update profil succesfully",
        results: profile
      })
    }
    throw Error("update_profile_failed")
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

exports.deleteProfile = async (request, response) => {
  try {
    const data = await profileModel.destroy(request.params.id)
    if (data) {
      return response.json({
        success: true,
        message: `Users profile ${request.params.id} deleted successfully`,
        results: data
      })
    }

    return response.status(404).json({
      success: false,
      message: "Users Profile not found"
    })
  } catch (err) {
    if (err) return errorHandler(err, response)
  }
}

const fileRemover = require("../helpers/fileRemover.helper")
const profileModel = require("../models/profile.model")
const errorHandler = require("../helpers/errorHandler.helper")

exports.updateProfil = async (req, res) => {
  try {
    const { id } = req.user
    const user = await profileModel.findOneByUserId(id)
    const data = {
      ...req.body,
    }
    if (req.file) {
      if (user.picture) {
        fileRemover({ filename: user.picture })
      }
      data.picture = req.file.filename
    }

    const profile = await profileModel.updateByUserId(id, data)
    if (!profile) {
      throw Error("update_profile_failed")
    }

    return res.json({
      succes: true,
      message: "update profile succesfully",
      results: profile,
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}
exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user
    const profile = await profileModel.findOneByUserId(id)
    if (!profile) {
      throw Error("Profile Not Found!")
    }
    return res.json({
      succes: true,
      message: "Detail Profle",
      results: profile,
    })
  } catch (err) {
    if (err) return errorHandler(err, res)
  }
}

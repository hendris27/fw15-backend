const profileRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const profileController = require("../controllers/profile.controller")

profileRouter.post("/", uploadMiddleware("picture"), profileController.updateProfil)

module.exports = profileRouter

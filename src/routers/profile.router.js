const profileRouter = require ("express").Router()
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const profileController = require("../controllers/profile.controller")

profileRouter.get("/", profileController.getProfile)
profileRouter.post("/", uploadMiddleware("picture"),validate("UpdateProfil"), profileController.updateProfil)

module.exports = profileRouter

const profileRouter = require ("express").Router()

const profileController =require("../../controllers/admin/profile.controller")
// const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

profileRouter.get("/", profileController.getAllProfile)
profileRouter.get("/:id", profileController.getOneProfile)
profileRouter.post("/", uploadMiddleware("picture"), profileController.createProfile)
profileRouter.patch("/:id", uploadMiddleware("picture"), profileController.updateProfile)
profileRouter.delete("/:id", profileController.deleteProfile)


module.exports = profileRouter

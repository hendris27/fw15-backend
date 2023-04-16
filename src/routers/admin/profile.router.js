const profileRouter = require ("express").Router()

const profileController =require("../../controllers/admin/profile.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")

profileRouter.get("/", validate("getAll"),profileController.getAllProfile)
profileRouter.get("/:id",validate("idParams"), profileController.getOneProfile)
profileRouter.post("/", uploadMiddleware("picture"),validate("createUpdateProfil"), profileController.createProfile)
profileRouter.patch("/:id", uploadMiddleware("picture"),validate("createUpdateProfil"), validate("idParams"), profileController.updateProfile)
profileRouter.delete("/:id", validate("idParams"), profileController.deleteProfile)


module.exports = profileRouter

const sectionRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")
const sectionController = require("../controllers/section.controller")

sectionRouter.get("/", uploadMiddleware("picture"), sectionController.getSection)

module.exports = sectionRouter

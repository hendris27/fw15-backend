const categoryRouter = require ("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middleware")
const categoryController = require("../controllers/category.controller")

categoryRouter.post("/", categoryController.updateCategory)

module.exports = categoryRouter

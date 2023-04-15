const categoriesRouter = require ("express").Router()

const categoriesController =require("../../controllers/admin/categories.controller")
// const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", categoriesController.getOneCategories)
categoriesRouter.post("/", categoriesController.createCategories)
categoriesRouter.patch("/:id",  categoriesController.updateCategories)
categoriesRouter.delete("/:id",  categoriesController.deleteCategories)


module.exports = categoriesRouter

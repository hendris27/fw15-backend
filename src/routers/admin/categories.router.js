const categoriesRouter = require ("express").Router()

const categoriesController =require("../../controllers/admin/categories.controller")
const validate = require("../../middlewares/validator.middleware")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

categoriesRouter.get("/", validate("getAll"),categoriesController.getAllCategories)
categoriesRouter.get("/:id", validate("idParams"),categoriesController.getOneCategories)
categoriesRouter.post("/",validate("createUpdateName"), categoriesController.createCategories)
categoriesRouter.patch("/:id", validate("idParams"),validate("createUpdateName"),categoriesController.updateCategories)
categoriesRouter.delete("/:id",validate("idParams"),  categoriesController.deleteCategories)


module.exports = categoriesRouter
